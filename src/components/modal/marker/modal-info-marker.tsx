import { MarkerData } from "@/types/map";
import { Button } from "../../ui/button";

interface propsInfoMarker {
    markerInfoModal: MarkerData | null;
    onClickClose: () => void;
    onClickDelete: () => void;
}

export default function InfoMarker({ markerInfoModal, onClickClose, onClickDelete }: propsInfoMarker) {
    return (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-2xl">
                <h2 className="mb-2 text-2xl font-bold text-gray-800">
                    {markerInfoModal?.name}
                </h2>

                <div className="mb-6 space-y-3 mt-4 text-gray-600">
                    <div>
                        <strong className="block text-xs uppercase text-gray-400">Descrição</strong>
                        <p>{markerInfoModal?.description || "Nenhuma descrição fornecida."}</p>
                    </div>

                    <div>
                        <strong className="block text-xs uppercase text-gray-400">Tipo</strong>
                        <p>{markerInfoModal?.type || "Não classificado"}</p>
                    </div>

                    <div>
                        <strong className="block text-xs uppercase text-gray-400">Coordenadas</strong>
                        <p className="text-xs">
                            Lat: {markerInfoModal?.lngLat[1].toFixed(4)} <br />
                            Lng: {markerInfoModal?.lngLat[0].toFixed(4)}
                        </p>
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