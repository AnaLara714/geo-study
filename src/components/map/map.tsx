'use client';

import 'maplibre-gl/dist/maplibre-gl.css';
import * as maplibregl from 'maplibre-gl';
import Map, {
    Marker,
    NavigationControl, MapLayerMouseEvent,
    Popup
} from 'react-map-gl/maplibre';
import { setWorkerUrl } from 'maplibre-gl';
import { useState, useEffect } from 'react';

import { MapMode, MarkerData, NewMarkPosition, RelationData } from '@/types/map';
import { ZoneData } from '@/types/zone';

import { MAPS_DEFAULT_LOCATION } from '@/utils/constants';
import { isPointInPolygon } from '@/utils/functions';

import MenuFunctions from '@/components/menu/menu-functions';
import AddMarker from '@/components/modal/marker/modal-add-marker';
import InfoMarker from '@/components/modal/marker/modal-info-marker';
import ZonesLayer from '@/components/layer/zone-layer';
import MenuBottom from '@/components/menu/menu-bottom';
import AddZone from '@/components/modal/zone/modal-add-zone';
import InfoZone from '@/components/modal/zone/modal-infoZone';
import RelationsLayer from '@/components/layer/relations-layer';
import AddRelation from '@/components/modal/relation/modal-add-relation';
import InfoRelation from '@/components/modal/relation/modal-info-relation';

setWorkerUrl('/maplibre/maplibre-gl-worker.mjs');

export default function MapComponent() {
    const [activeMode, setActiveMode] = useState<MapMode>('none');

    const [openNewMark, setOpenNewMark] = useState(false);

    const [newMarkerPosition, setNewMarkerPosition] = useState<NewMarkPosition | null>(null);
    const [markerInfoModal, setMarkerInfoModal] = useState<MarkerData | null>(null);

    const [zones, setZones] = useState<ZoneData[]>([]);
    const [currentZonePoints, setCurrentZonePoints] = useState<[number, number][]>([]);
    const [openNewZone, setOpenNewZone] = useState(false);
    const [zoneForm, setZoneForm] = useState({ name: "", color: "#3b82f6" });
    const [selectedZoneModal, setSelectedZoneModal] = useState<ZoneData | null>(null);

    const [markers, setMarkers] = useState<MarkerData[]>([]);
    const [hoveredMarkerId, setHoveredMarkerId] = useState<number | null>(null);

    const [selectedMarkerId, setSelectedMarkerId] = useState<number | null>(null);
    const [selectOrigin, setSelectOrigin] = useState<[lng: number, lat: number] | null>(null);
    const [selectDestination, setSelectDestination] = useState<[lng: number, lat: number] | null>(null);
    const [relations, setRelations] = useState<RelationData[]>([]);
    const [openRelationModal, setOpenRelationModal] = useState(false);
    const [relationForm, setRelationForm] = useState({ name: "", color: "#ef4444" });

    const [hoveredLineInfo, setHoveredLineInfo] = useState<{ x: number; y: number; name: string } | null>(null);
    const [selectedRelationInfoModal, setSelectedRelationInfoModal] = useState<RelationData | null>(null);

    const [form, setForm] = useState({
        name: "",
        description: "",
        type: "",
    });

    useEffect(() => {
        if (activeMode !== 'location') {
            setOpenNewMark(false);
            setNewMarkerPosition(null);
        }
        if (activeMode !== 'draw') {
            setSelectOrigin(null);
            setSelectDestination(null);
            setSelectedMarkerId(null);
            setOpenRelationModal(false);
        }
        if (activeMode !== 'zone') {
            setCurrentZonePoints([]);
            setOpenNewZone(false);
        }

        setHoveredLineInfo(null);
    }, [activeMode]);

    const handleMapClick = (event: MapLayerMouseEvent) => {
        const lngLat: [number, number] = [
            event.lngLat.lng,
            event.lngLat.lat,
        ];

        if (activeMode === 'none') {
            const lineFeature = event.features?.find((f) => f.layer.id === 'lineLayer');
            if (lineFeature) {
                const relationId = lineFeature.properties?.id;
                const clickedRelation = relations.find((r) => r.id === relationId);
                if (clickedRelation) {
                    setSelectedRelationInfoModal(clickedRelation);
                    setHoveredLineInfo(null);
                    return;
                }
            }

            const zoneFeature = event.features?.find((f) => f.layer.id === 'saved-zones-fill');
            if (zoneFeature) {
                const zoneId = zoneFeature.properties?.id;
                const clickedZone = zones.find((z) => z.id === zoneId);
                if (clickedZone) {
                    setSelectedZoneModal(clickedZone);
                    return;
                }
            }
        }

        if (activeMode === 'location') {
            setSelectedMarkerId(null);
            setNewMarkerPosition({ lngLat });
            setForm({ name: "", description: "", type: "" });
            setOpenNewMark(true);
        }
        else if (activeMode === 'zone' && !openNewZone) {
            setCurrentZonePoints((prev) => [...prev, lngLat]);
        }
    };

    const handleMouseMove = (event: MapLayerMouseEvent) => {
        if (activeMode !== 'none') {
            if (hoveredLineInfo) setHoveredLineInfo(null);
            return;
        }

        const lineFeature = event.features?.find((f) => f.layer.id === 'lineLayer');

        if (lineFeature && lineFeature.properties?.name) {
            setHoveredLineInfo({
                x: event.point.x,
                y: event.point.y,
                name: lineFeature.properties.name
            });
        } else {
            setHoveredLineInfo(null);
        }
    };

    const handleOpenZoneModal = () => {
        if (currentZonePoints.length < 3) return;
        setOpenNewZone(true);
    };

    const confirmSaveZone = () => {
        if (!zoneForm.name.trim()) {
            alert("Informe o nome da zona.");
            return;
        }

        const newZone: ZoneData = {
            id: Date.now(),
            name: zoneForm.name.trim(),
            coordinates: [...currentZonePoints, currentZonePoints[0]],
            color: zoneForm.color,
        };

        setZones((prev) => [...prev, newZone]);
        setCurrentZonePoints([]);
        setOpenNewZone(false);
        setZoneForm({ name: "", color: "#3b82f6" });
    };

    const handleCancelZone = () => {
        setOpenNewZone(false);
    };

    const handleSaveMarker = () => {
        if (!newMarkerPosition) return;

        if (!form.name.trim()) {
            alert("Informe o nome da referência.");
            return;
        }

        const newMarker: MarkerData = {
            id: Date.now(),
            lngLat: newMarkerPosition.lngLat,
            name: form.name.trim(),
            description: form.description.trim(),
            type: form.type.trim(),
        };

        setMarkers((prev) => [...prev, newMarker]);

        setOpenNewMark(false);
        setNewMarkerPosition(null);
        setForm({ name: "", description: "", type: "" });
    };

    const handleCancelNewMarker = () => {
        setOpenNewMark(false);
        setNewMarkerPosition(null);
        setSelectedMarkerId(null);
        setForm({ name: "", description: "", type: "" });
    };

    const handleFormChange = (field: keyof MarkerData, value: string) => {
        setForm((current) => ({ ...current, [field]: value }));
    };

    const handleZoneFormChange = (field: keyof ZoneData, value: string) => {
        setZoneForm((current) => ({ ...current, [field]: value }));
    };

    const handleRelationFormChange = (field: keyof RelationData, value: string) => {
        setRelationForm((current) => ({ ...current, [field]: value }));
    };

    const handleSelectMarker = (marker: MarkerData) => {
        if (activeMode !== 'draw') return;

        if (openRelationModal) return;

        if (!selectOrigin) {
            setSelectOrigin(marker.lngLat);
            setSelectedMarkerId(marker.id);
            return;
        }

        if (!selectDestination) {
            if (marker.id === selectedMarkerId) return;

            setSelectDestination(marker?.lngLat);
            setOpenRelationModal(true);
            return;
        }
    }

    const confirmSaveRelation = () => {
        if (!relationForm.name.trim()) {
            alert("Informe um nome para esta relação.");
            return;
        }

        if (selectOrigin && selectDestination) {
            const newRelation: RelationData = {
                id: Date.now(),
                name: relationForm.name.trim(),
                color: relationForm.color,
                originLngLat: selectOrigin,
                destinationLngLat: selectDestination,
            };

            setRelations((prev) => [...prev, newRelation]);
        }

        setSelectOrigin(null);
        setSelectDestination(null);
        setSelectedMarkerId(null);
        setOpenRelationModal(false);
        setRelationForm({ name: "", color: "#ef4444" });
    }

    const handleCancelRelation = () => {
        setSelectDestination(null);
        setOpenRelationModal(false);
        setRelationForm({ name: "", color: "#ef4444" });
    };

    const selectedMarker = markers.find((marker) => marker.id === selectedMarkerId);
    const popupMarkerId = selectedMarkerId ?? hoveredMarkerId;
    const popupMarker = markers.find((marker) => marker.id === popupMarkerId);

    const markersInsideSelectedZone = selectedZoneModal
        ? markers.filter((marker) => isPointInPolygon(marker.lngLat, selectedZoneModal.coordinates))
        : [];

    const originMarker = selectedRelationInfoModal ? markers.find(m => m.lngLat[0] === selectedRelationInfoModal.originLngLat[0] && m.lngLat[1] === selectedRelationInfoModal.originLngLat[1]) : null;
    const destMarker = selectedRelationInfoModal ? markers.find(m => m.lngLat[0] === selectedRelationInfoModal.destinationLngLat[0] && m.lngLat[1] === selectedRelationInfoModal.destinationLngLat[1]) : null;

    let mapCursor = 'grab';
    if (activeMode === 'location' || activeMode === 'zone') mapCursor = 'crosshair';
    if (activeMode === 'draw' || hoveredLineInfo !== null) mapCursor = 'pointer';

    return (
        <div className="h-screen w-full relative" id='map'>
            <Map
                mapLib={maplibregl}
                initialViewState={MAPS_DEFAULT_LOCATION}
                mapStyle="https://tiles.openfreemap.org/styles/liberty"
                style={{ width: '100%', height: '100%' }}
                cursor={mapCursor}
                onClick={handleMapClick}
                onMouseMove={handleMouseMove}
                onMouseLeave={() => setHoveredLineInfo(null)}
                interactiveLayerIds={['saved-zones-fill', 'lineLayer']}
            >
                <NavigationControl position="top-right" />

                <MenuFunctions activeMode={activeMode} setActiveMode={setActiveMode} drawEnable={!(markers.length >= 2)} />

                {markers.map((marker) => {
                    const isSelected = selectedMarkerId === marker.id;
                    return (
                        <Marker
                            key={marker.id}
                            longitude={marker.lngLat[0]}
                            latitude={marker.lngLat[1]}
                            anchor='bottom'
                            color={isSelected ? "#2563eb" : "#ef4444"}
                            onClick={(evt) => {
                                evt.originalEvent.stopPropagation();

                                if (activeMode === 'draw') {
                                    handleSelectMarker(marker);
                                } else if (activeMode === 'none') {
                                    setMarkerInfoModal(marker);
                                }
                            }}
                        >
                            <div
                                className={`cursor-pointer transition-transform duration-150 ${isSelected ? "scale-125" : "hover:scale-110"} `}
                                onMouseEnter={() => setHoveredMarkerId(marker.id)}
                                onMouseLeave={() => setHoveredMarkerId((current) => current === marker.id ? null : current)}
                            >
                                <div className={`flex h-8 w-8 items-center justify-center rounded-full border-2 border-white ${isSelected ? "bg-blue-600" : "bg-red-500"} `}>
                                    <div className="h-3 w-3 rounded-full bg-white z-1" />
                                </div>
                                <div className={`absolute -bottom-0.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 shadow-[2px_2px_12px_5px_rgba(17,_12,_46,_0.15)] ${isSelected ? "bg-blue-600" : "bg-red-500"} `} />
                            </div>
                        </Marker>
                    )
                })}

                <ZonesLayer zones={zones} currentZonePoints={currentZonePoints} />
                <RelationsLayer relations={relations} selectOrigin={selectOrigin} selectDestination={selectDestination} openRelationModal={openRelationModal} />

                {popupMarker && !openRelationModal && (
                    <Popup
                        longitude={popupMarker.lngLat[0]}
                        latitude={popupMarker.lngLat[1]}
                        anchor="bottom"
                        offset={35}
                        closeButton={false}
                        closeOnClick={false}
                        onClose={() => setSelectedMarkerId(null)}
                    >
                        <div className="min-w-55 max-w-75 p-1">
                            <h3 className="text-base font-semibold text-gray-900">
                                {popupMarker.name}
                            </h3>
                        </div>
                    </Popup>
                )}
            </Map>

            {hoveredLineInfo && activeMode === 'none' && (
                <div
                    className="absolute z-40 bg-gray-900 text-white text-sm px-3 py-1.5 rounded shadow-lg pointer-events-none transform -translate-x-1/2 -translate-y-full transition-opacity duration-150"
                    style={{ left: hoveredLineInfo.x, top: hoveredLineInfo.y - 15 }}
                >
                    {hoveredLineInfo.name}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                </div>
            )}

            {activeMode === 'zone' && currentZonePoints.length >= 3 && !openNewZone && (
                <MenuBottom handleOpenZoneModal={handleOpenZoneModal} onClickClean={() => setCurrentZonePoints([])} />
            )}

            {selectedZoneModal && (
                <InfoZone
                    markersInsideSelectedZone={markersInsideSelectedZone}
                    selectedZoneModal={selectedZoneModal}
                    onClickClose={() => setSelectedZoneModal(null)}
                />
            )}

            {openNewZone && (
                <AddZone
                    zoneForm={zoneForm}
                    onChange={handleZoneFormChange}
                    handleCancelZone={handleCancelZone}
                    confirmSaveZone={confirmSaveZone}
                    handleOpenZoneModal={handleOpenZoneModal}
                />
            )}

            {openNewMark && newMarkerPosition && (
                <AddMarker
                    form={form}
                    onChange={handleFormChange}
                    handleCancelNewMarker={handleCancelNewMarker}
                    handleSaveMarker={handleSaveMarker}
                    newMarkerPosition={newMarkerPosition}
                />
            )}

            {markerInfoModal && (
                <InfoMarker markerInfoModal={markerInfoModal} onClickClose={() => setMarkerInfoModal(null)} />
            )}

            {openRelationModal && (
                <AddRelation
                    relationForm={relationForm}
                    confirmSaveRelation={confirmSaveRelation}
                    handleCancelRelation={handleCancelRelation}
                    onChange={handleRelationFormChange}
                />
            )}

            {selectedRelationInfoModal && (
                <InfoRelation
                    selectedRelationInfoModal={selectedRelationInfoModal}
                    originMarker={originMarker}
                    destMarker={destMarker}
                    onClickClose={() => setSelectedRelationInfoModal(null)}
                />
            )}
        </div >
    );
}