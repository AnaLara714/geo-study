import '@xyflow/react/dist/style.css';
import { useMemo } from 'react';
import { ReactFlow, Background, Controls, Node, Edge } from '@xyflow/react';
import { MarkerData, RelationData } from '@/types/map';
import { Button } from '@/components/ui/button';

interface GraphModalProps {
    onClose: () => void;
    markers: MarkerData[];
    relations: RelationData[];
}

export default function GraphView({ markers, relations, onClose }: GraphModalProps) {
    const nodes: Node[] = useMemo(() => {
        return markers?.map((marker) => ({
            id: marker.id.toString(),
            data: { label: marker.name },
            position: {
                x: marker.lngLat[0] * 20000,
                y: -marker.lngLat[1] * 20000,
            },
        }));
    }, [markers]);

    const edges: Edge[] = useMemo(() => {
        return relations.reduce<Edge[]>((acc, rel) => {
            const sourceMarker = markers.find(
                (m) => m.lngLat[0] === rel.originLngLat[0] && m.lngLat[1] === rel.originLngLat[1]
            );
            const targetMarker = markers.find(
                (m) => m.lngLat[0] === rel.destinationLngLat[0] && m.lngLat[1] === rel.destinationLngLat[1]
            );

            if (sourceMarker && targetMarker) {
                acc.push({
                    id: rel.id.toString(),
                    source: sourceMarker.id.toString(),
                    target: targetMarker.id.toString(),
                    label: rel.name,
                    style: { stroke: rel.color || '#000', strokeWidth: 2 },
                });
            }

            return acc;
        }, []);
    }, [markers, relations]);

    return (
        <div className="absolute inset-0 bg-black/50 z-50 flex items-center justify-center">
            <div className="h-11/12 w-full max-w-7xl rounded-xl bg-white p-6 shadow-2xl">
                <div className="flex justify-end">
                    <Button
                        variant="default"
                        onClick={onClose}
                    >
                        Fechar
                    </Button>
                </div>
                <div className="h-11/12 w-full">
                    <ReactFlow nodes={nodes} edges={edges} fitView>
                        <Background />
                        <Controls />
                    </ReactFlow>
                </div>
            </div>
        </div>
    );
}