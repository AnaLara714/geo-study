import { MarkerData, NewMarkPosition } from "@/types/map";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

interface propsAddMarker {
    form: {
        name: string;
        description: string;
        type: string;
    };
    onChange: (
        field: keyof MarkerData,
        value: string
    ) => void;
    handleCancelNewMarker: () => void;
    handleSaveMarker: () => void;
    newMarkerPosition: NewMarkPosition;
}

export default function AddMarker({ form, handleCancelNewMarker, handleSaveMarker, newMarkerPosition, onChange }: propsAddMarker) {
    return (
        <div className="absolute left-1/2 top-25 z-50 w-95 max-w-[calc(100%-32px)] -translate-x-1/2 rounded-xl bg-white p-5 shadow-2xl " >
            <div className="mb-4">
                <h2 className="text-lg font-semibold">
                    Adicionar referência
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                    Informe os dados do local selecionado.
                </p>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="mb-1 block text-sm font-medium">
                        Nome
                    </label>

                    <Input
                        type="text"
                        value={form.name}
                        onChange={(event) => onChange("name", event.target.value)}
                        placeholder="Ex.: Entrada principal"
                        className=" w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 " />
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium">
                        Descrição
                    </label>

                    <Textarea
                        value={form.description}
                        onChange={(event) => onChange("description", event.target.value)}
                        placeholder="Descreva o local..."
                        rows={3}
                        className=" w-full resize-none rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 " />
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium">
                        Tipo
                    </label>

                    <Input
                        type="text"
                        value={form.type}
                        onChange={(event) => onChange("type", event.target.value)}
                        placeholder="Ex.: área de lazer, ponto gastronomico, ponto de saúde..."
                        className=" w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 " />
                </div>

                <div className="rounded-lg bg-gray-50 p-3 text-xs text-gray-500">
                    <div>
                        Latitude:
                        {newMarkerPosition.lngLat[1].toFixed(6)}
                    </div>

                    <div>
                        Longitude:
                        {newMarkerPosition.lngLat[0].toFixed(6)}
                    </div>
                </div>

                <div className="flex gap-2">
                    <Button
                        type="button"
                        variant={"destructive"}
                        onClick={handleCancelNewMarker}
                        className=" flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 "
                    >
                        Cancelar
                    </Button>

                    <Button
                        type="button"
                        variant={"secondary"}
                        onClick={handleSaveMarker} className=" flex-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 "
                    >
                        Salvar referência
                    </Button>
                </div>
            </div>
        </div>
    )
}