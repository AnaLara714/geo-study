import { Source, Layer } from 'react-map-gl/maplibre';
import { FeatureCollection, Feature } from "geojson"

import { ZoneData } from '@/types/zone';

interface ZonesLayerProps {
  zones: ZoneData[];
  currentZonePoints: [number, number][];
}

export default function ZonesLayer({ zones, currentZonePoints }: ZonesLayerProps) {
  const savedZonesGeoJSON: FeatureCollection = {
    type: 'FeatureCollection',
    features: zones.map((zone) => ({
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [zone.coordinates],
      },
      properties: {
        id: zone.id,
        name: zone.name,
        color: zone.color
      },
    })),
  };

  const isPolygonReady = currentZonePoints.length >= 3;

  const closedDraftCoordinates = isPolygonReady
    ? [...currentZonePoints, currentZonePoints[0]]
    : currentZonePoints;

  const draftGeoJSON: Feature | null = currentZonePoints.length > 0
    ? isPolygonReady
      ? {
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [closedDraftCoordinates],
        },
        properties: {},
      }
      : {
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: currentZonePoints,
        },
        properties: {},
      }
    : null;

  return (
    <>
      {zones.length > 0 && (
        <Source id="saved-zones-source" type="geojson" data={savedZonesGeoJSON}>
          <Layer
            id="saved-zones-fill"
            type="fill"
            paint={{
              'fill-color': ['get', 'color'],
              'fill-opacity': 0.4,
            }}
          />
          <Layer
            id="saved-zones-outline"
            type="line"
            paint={{
              'line-color': ['get', 'color'],
              'line-width': 2,
            }}
          />
        </Source>
      )}

      {draftGeoJSON && (
        <Source id="draft-zone-source" type="geojson" data={draftGeoJSON}>
          {isPolygonReady && (
            <Layer
              id="draft-zone-fill"
              type="fill"
              paint={{
                'fill-color': '#10b981',
                'fill-opacity': 0.3,
              }}
            />
          )}
          <Layer
            id="draft-zone-line"
            type="line"
            paint={{
              'line-color': '#10b981',
              'line-width': 2,
              'line-dasharray': [2, 2],
            }}
          />
        </Source>
      )}
    </>
  );
}