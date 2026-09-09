import { MarkerData, RelationData } from "@/types/map";
import { Button } from "../../ui/button";

interface propsInfoRelation {
    selectedRelationInfoModal: RelationData;
    originMarker: MarkerData | null | undefined;
    destMarker: MarkerData | null | undefined;
    onClickClose: () => void;
    onClickDelete: () => void;
}

export default function InfoRelation({ selectedRelationInfoModal, originMarker, destMarker, onClickClose, onClickDelete }: propsInfoRelation) {
    return (
        <div className="absolute inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white p-6 rounded-lg w-96 shadow-xl flex flex-col">
                <div className="flex items-center gap-3 mb-5">
                    <div
                        className="w-5 h-5 rounded-full border border-black/20 shrink-0"
                        style={{ backgroundColor: selectedRelationInfoModal.color }}
                    />
                    <h2 className="text-xl font-bold text-gray-900 break-words leading-tight">
                        {selectedRelationInfoModal.name}
                    </h2>
                </div>

                <div className="bg-gray-50 p-4 rounded-md border border-gray-100 mb-6">
                    <div className="flex flex-col gap-3">
                        <div>
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Origem</span>
                            <p className="font-medium text-gray-800">{originMarker?.name || 'Local Removido/Desconhecido'}</p>
                        </div>

                        <div className="h-4 border-l-2 border-dashed border-gray-300 ml-2"></div>

                        <div>
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Destino</span>
                            <p className="font-medium text-gray-800">{destMarker?.name || 'Local Removido/Desconhecido'}</p>
                        </div>
                    </div>
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