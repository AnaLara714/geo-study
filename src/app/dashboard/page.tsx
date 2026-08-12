'use client'
import dynamic from 'next/dynamic'

export default function Dashboard() {

    const MapContainer = dynamic(() => import('@/components/map/Map'), { ssr: false })

    return (
        <div className="flex flex-col flex-1 items-center justify-center font-sans dark:bg-black">
            <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-center py-32 px-16 bg-white dark:bg-black">
                <MapContainer />
            </main>
        </div>
    );
}
