import { Source, Layer } from 'react-map-gl/maplibre';
import { Feature } from "geojson"

import { RelationData } from '@/types/map';

interface RelationsLayerProps {
    relations: RelationData[];
    selectOrigin: [lng: number, lat: number] | null;
    selectDestination: [lng: number, lat: number] | null;
    openRelationModal: boolean
}

export default function RelationsLayer({ relations, selectOrigin, selectDestination, openRelationModal }: RelationsLayerProps) {
    const relationFeatures: Feature[] = relations.map((rel) => ({
        type: "Feature",
        properties: { id: rel.id, color: rel.color, name: rel.name },
        geometry: {
            type: "LineString",
            coordinates: [rel.originLngLat, rel.destinationLngLat]
        }
    }));

    if (selectOrigin && selectDestination && openRelationModal) {
        relationFeatures.push({
            type: "Feature",
            properties: { color: "#9ca3af" },
            geometry: {
                type: "LineString",
                coordinates: [selectOrigin, selectDestination]
            }
        });
    }

    const relationsGeoJSON: GeoJSON.FeatureCollection = {
        type: "FeatureCollection",
        features: relationFeatures
    };

    return (
        <>
            {relationFeatures.length > 0 && (
                <Source id="polylineLayer" type="geojson" data={relationsGeoJSON}>
                    <Layer
                        id="lineLayer"
                        type="line"
                        layout={{
                            "line-join": "round",
                            "line-cap": "round"
                        }}
                        paint={{
                            "line-color": ["get", "color"],
                            "line-width": 5,
                            "line-opacity": 0.7
                        }}
                    />
                </Source>
            )}
        </>
    );
}