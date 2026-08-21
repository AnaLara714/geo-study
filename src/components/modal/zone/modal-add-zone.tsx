import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ZoneData } from "@/types/zone";

interface propAddZone {
    zoneForm: {
        name: string;
        color: string;
    }
    handleOpenZoneModal: () => void;
    handleCancelZone: () => void;
    confirmSaveZone: () => void;
    onChange: (
        field: keyof ZoneData,
        value: string
    ) => void;
}

export default function AddZone({ zoneForm, confirmSaveZone, handleCancelZone, onChange }: propAddZone) {
    return (
        <div className="absolute inset-0 bg-black/50 z-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-80 shadow-xl">
                <h2 className="text-lg font-bold mb-4 text-gray-900">Nova Zona</h2>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nome da Zona
                    </label>
                    <Input
                        type="text"
                        className="w-full border border-gray-300 p-2 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                        placeholder="Ex: Área Restrita"
                        value={zoneForm.name}
                        onChange={(event) => onChange("name", event.target.value)}
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Cor da Zona
                    </label>
                    <Input
                        type="color"
                        className="w-full h-10 border border-gray-300 p-1 rounded-md cursor-pointer"
                        value={zoneForm.color}
                        onChange={(event) => onChange("name", event.target.value)}
                    />
                </div>

                <div className="flex justify-end gap-2">
                    <Button
                        onClick={handleCancelZone}
                        variant={"destructive"}
                    >
                        Cancelar
                    </Button>
                    <Button
                        onClick={confirmSaveZone}
                    >
                        Salvar
                    </Button>
                </div>
            </div>
        </div>
    )
}




