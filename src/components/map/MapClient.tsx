'use client';

import dynamic from 'next/dynamic';

const MapComponent = dynamic(
    () => import('./Map'),
    {
        ssr: false,
        loading: () => (
            <div className="flex h-full w-full items-center justify-center bg-gray-100">
                Carregando mapa...
            </div>
        ),
    }
);

export default function MapClient() {
    return (
        <div className="h-full w-full">
            <MapComponent />
        </div>
    )
}