import Button from "../Button";

{/* Modal de confirmação */}
function confirmModal({open, title="Confirmar Ação", message="Tem certeza que deseja prosseguir", confirmLabel="Confirmar", cancelLabel="Cancelar", onClose, onConfirm}) {
    return (
        <>
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-1 backdrop-blur-sm">
                {open && (
                    <div className="flex flex-col bg-[#121212c7] max-w-sm p-6 text-center rounded-2xl shadow-2xl">
                        <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
                        <p className="text-[16px] font text-white mb-2">{message}</p>
                        <div className="flex justify-center mt-4 gap-8">
                            <Button title={confirmLabel} onClick={onConfirm} size="small"></Button>
                            <Button title={cancelLabel} onClick={onClose} size="small" ></Button>
                        </div>
                    </div>

                )}
            </div>
            
        </>
    )
}

export default confirmModal;