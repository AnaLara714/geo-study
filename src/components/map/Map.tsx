'use client';

import 'maplibre-gl/dist/maplibre-gl.css';
import * as  maplibregl from "maplibre-gl"

import Map, {
    Marker,
    NavigationControl,
} from 'react-map-gl/maplibre';

import { setWorkerUrl } from "maplibre-gl"

setWorkerUrl('/maplibre/maplibre-gl-worker.mjs')

export default function MapComponent() {

    return (
        <div className="h-full w-full" id='map'>
            <Map
                mapLib={maplibregl}
                initialViewState={{
                    longitude: -45.2131,
                    latitude: -10.3153,
                    zoom: 3,
                }}
                mapStyle="https://tiles.openfreemap.org/styles/liberty"
                style={{
                    width: '100%',
                    height: '100%',
                }}
            >
                <NavigationControl position="top-right" />

                <Marker
                    longitude={-45.2131}
                    latitude={-10.3153}
                    color="#ef4444"
                />
            </Map>
        </div >
    );
}


