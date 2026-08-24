import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RelationData } from "@/types/map";

interface propAddRelation {
    relationForm: {
        name: string;
        color: string;
    }
    handleCancelRelation: () => void;
    confirmSaveRelation: () => void;
    onChange: (
        field: keyof RelationData,
        value: string
    ) => void;
}

export default function AddRelation({ relationForm, confirmSaveRelation, handleCancelRelation, onChange }: propAddRelation) {
    return (
        <div className="absolute inset-0 bg-black/50 z-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-80 shadow-xl">
                <h2 className="text-lg font-bold mb-4 text-gray-900">Vincular Locais</h2>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Descrição do Vínculo
                    </label>
                    <Input
                        type="text"
                        className="w-full border border-gray-300 p-2 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                        placeholder="Ex: Rota de Entrega, Filial para Matriz"
                        value={relationForm.name}
                        onChange={(e) => onChange("name", e.target.value)}
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Cor da Linha
                    </label>
                    <Input
                        type="color"
                        className="w-full h-10 border border-gray-300 p-1 rounded-md cursor-pointer"
                        value={relationForm.color}
                        onChange={(e) => onChange("color", e.target.value)}
                    />
                </div>

                <div className="flex justify-end gap-2">
                    <Button
                        variant={"destructive"}
                        onClick={handleCancelRelation}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                    >
                        Cancelar
                    </Button>
                    <Button
                        onClick={confirmSaveRelation}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Salvar Vínculo
                    </Button>
                </div>
            </div>
        </div>
    )
}




