interface propsMenuBottom {
    handleOpenZoneModal: () => void;
    onClickClean: () => void;
}

export default function MenuBottom({ handleOpenZoneModal, onClickClean }: propsMenuBottom) {
    return (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 bg-white p-3 rounded-lg shadow-lg flex gap-2">
            <button
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium"
                onClick={handleOpenZoneModal}
            >
                Concluir Zona
            </button>
            <button
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 text-sm font-medium"
                onClick={onClickClean}
            >
                Limpar
            </button>
        </div>
    )
}

