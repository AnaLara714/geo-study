import { MarkerData } from "@/types/map";
import { Button } from "../../ui/button";
import { ZoneData } from "@/types/zone";

interface propsInfoZone {
    selectedZoneModal: ZoneData;
    markersInsideSelectedZone: MarkerData[];
    onClickClose: () => void;
    onClickDelete: () => void;
}

export default function InfoZone({ selectedZoneModal, markersInsideSelectedZone, onClickClose, onClickDelete }: propsInfoZone) {
    return (
        <div className="absolute inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white p-6 rounded-lg w-96 shadow-xl max-h-[80vh] flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                    <div
                        className="w-5 h-5 rounded-full border border-black/20"
                        style={{ backgroundColor: selectedZoneModal.color }}
                    />
                    <h2 className="text-xl font-bold text-gray-900">{selectedZoneModal.name}</h2>
                </div>

                <div className="mb-4">
                    <span className="text-sm font-medium text-gray-500">
                        Marcadores dentro desta zona ({markersInsideSelectedZone.length}):
                    </span>
                </div>

                <div className="overflow-y-auto flex-1 mb-4 divide-y divide-gray-100">
                    {markersInsideSelectedZone.length > 0 ? (
                        markersInsideSelectedZone.map((marker) => (
                            <div key={marker.id} className="py-2">
                                <p className="font-semibold text-sm text-gray-800">{marker.name}</p>
                                {marker.type && (
                                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                                        {marker.type}
                                    </span>
                                )}
                                {marker.description && (
                                    <p className="text-xs text-gray-500 mt-1">{marker.description}</p>
                                )}
                            </div>
                        ))
                    ) : (
                        <p className="text-sm text-gray-400 italic py-2">
                            Nenhum marcador localizado dentro desta área.
                        </p>
                    )}
                </div>

                <div className="flex justify-between">
                    <Button
                        variant="destructive"
                        onClick={onClickDelete}
                    >
                        Deletar
                    </Button>
                    <Button
                        variant="default"
                        onClick={onClickClose}
                    >
                        Fechar
                    </Button>
                </div>
            </div>
        </div>
    )
}