'use client';

import 'maplibre-gl/dist/maplibre-gl.css';
import * as  maplibregl from 'maplibre-gl';
import Map, {
    Marker,
    NavigationControl, MapLayerMouseEvent,
    Popup
} from 'react-map-gl/maplibre';
import { setWorkerUrl } from 'maplibre-gl';
import { useState } from 'react';
import { MarkerData, NewMarkPosition } from '@/types/map';
import AddMarker from '../modal/AddMarker';

setWorkerUrl('/maplibre/maplibre-gl-worker.mjs');

const MAPS_DEFAULT_LOCATION = {
    latitude: -12.086374,
    longitude: -77.042793,
    zoom: 12,
};

export default function MapComponent() {
    const [openNewMark, setOpenNewMark] = useState(false);

    const [newMarkerPosition, setNewMarkerPosition] = useState<NewMarkPosition | null>(null);

    const [markers, setMarkers] = useState<MarkerData[]>([]);
    const [hoveredMarkerId, setHoveredMarkerId] = useState<number | null>(null);
    const [selectedMarkerId, setSelectedMarkerId] = useState<number | null>(null);

    const [form, setForm] = useState({
        name: "",
        description: "",
        type: "",
    });

    const handleMapClick = (event: MapLayerMouseEvent) => {
        const lngLat: [number, number] = [
            event.lngLat.lng,
            event.lngLat.lat,
        ];

        setSelectedMarkerId(null);

        setNewMarkerPosition({
            lngLat,
        });

        setForm({
            name: "",
            description: "",
            type: "",
        });

        setOpenNewMark(true);
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

        setMarkers((prev) => [
            ...prev,
            newMarker,
        ]);

        setOpenNewMark(false);

        setNewMarkerPosition(null);

        setForm({
            name: "",
            description: "",
            type: "",
        });
    };

    const handleCancelNewMarker = () => {
        setOpenNewMark(false);
        setNewMarkerPosition(null);

        setForm({
            name: "",
            description: "",
            type: "",
        });
    };

    const handleFormChange = (
        field: keyof MarkerData,
        value: string
    ) => {
        setForm((current) => ({
            ...current,
            [field]: value,
        }));
    };

    const selectedMarker = markers.find(
        (marker) => marker.id === selectedMarkerId
    );


    const popupMarkerId = selectedMarkerId ?? hoveredMarkerId;

    const popupMarker = markers.find(
        (marker) => marker.id === popupMarkerId
    );

    return (
        <div className="h-full w-full" id='map'>
            <Map
                mapLib={maplibregl}
                initialViewState={MAPS_DEFAULT_LOCATION}
                mapStyle="https://tiles.openfreemap.org/styles/liberty"
                style={{
                    width: '100%',
                    height: '100%',
                }}
                onClick={handleMapClick}
            >
                <NavigationControl position="top-right" />
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
                                setSelectedMarkerId(marker.id);
                            }}
                        >
                            <div
                                className={`cursor-pointer transition-transform  duration-150 ${isSelected ? "scale-125" : "hover:scale-110"} `}
                                onMouseEnter={() => { setHoveredMarkerId(marker.id); }}
                                onMouseLeave={() => {
                                    setHoveredMarkerId((current) => current === marker.id ? null : current);
                                }}
                                onClick={(event) => {
                                    event.stopPropagation(); setSelectedMarkerId(marker.id);
                                }}
                            >
                                <div className={`flex h-8 w-8 tems-center justify-center rounded-full border-2 border-white  ${isSelected ? "bg-blue-600" : "bg-red-500"} `}>
                                    <div className="h-3 w-3 mt-2 rounded-full bg-white z-1" />
                                </div>
                                <div className={`absolute -bottom-0.5 left-1/2 h-3  w-3 -translate-x-1/2 rotate-45 shadow-[2px_2px_12px_5px_rgba(17,_12,_46,_0.15)] ${isSelected ? "bg-blue-600" : "bg-red-500"} `} />
                            </div>
                        </Marker>
                    )
                })}

                {popupMarker && (
                    <Popup
                        longitude={popupMarker.lngLat[0]}
                        latitude={popupMarker.lngLat[1]}
                        anchor="bottom"
                        offset={35}
                        closeButton={false}
                        closeOnClick={false}
                        onClose={() => {
                            setSelectedMarkerId(null);
                        }}
                    >
                        <div className="min-w-55 max-w-75 p-1">
                            <h3 className="text-base font-semibold text-gray-900">
                                {popupMarker.name}
                            </h3>

                            {popupMarker.description && (
                                <p className="mt-1 text-sm text-gray-600">
                                    {popupMarker.description}
                                </p>
                            )}

                            {popupMarker.type && (
                                <p className="mt-2 text-xs text-gray-500">
                                    <strong>Tipo:</strong>{" "}
                                    {popupMarker.type}
                                </p>
                            )}

                            {selectedMarkerId === popupMarker.id && (
                                <div className="mt-3 border-t pt-2 text-xs text-blue-600">
                                    Referência selecionada
                                </div>
                            )}
                        </div>
                    </Popup>
                )}
            </Map>

            {openNewMark && newMarkerPosition && (
                <AddMarker
                    form={form}
                    onChange={handleFormChange}
                    handleCancelNewMarker={handleCancelNewMarker}
                    handleSaveMarker={handleSaveMarker}
                    newMarkerPosition={newMarkerPosition}
                />
            )}
        </div >
    );
}


