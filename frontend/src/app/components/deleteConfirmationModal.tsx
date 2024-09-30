import React from "react";

// Exemplo básico de implementação do DeleteConfirmationModal
const DeleteConfirmationModal = ({ isOpen, onClose, onDelete }: any) => {
  if (!isOpen) return null; // Se não estiver aberto, não renderiza nada

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="font-bold">Confirmar Exclusão</h2>
        <p>Tem certeza que deseja excluir?</p>
        <div className="flex justify-end mt-4">
          <button onClick={onClose} className="mr-2 px-4 py-2 bg-gray-500 text-white rounded">
            Cancelar
          </button>
          
          <button onClick={onDelete} className="mr-2 px-4 py-2 bg-red-600 text-white rounded">
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
