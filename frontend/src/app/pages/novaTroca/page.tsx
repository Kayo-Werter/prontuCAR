import React from "react";

const NovaTroca = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Nova Troca</h1>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Data da Troca:</label>
          <input
            type="text"
            placeholder="dd/mm/aaaa"
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Veículo:</label>
          <select className="w-full p-2 border rounded">
            <option>Selecionar Veículo</option>
            {/* Adicione aqui as opções de veículos */}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Observações:</label>
          <textarea
            placeholder="Digite aqui:"
            className="w-full p-2 border rounded"
            rows={4}
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium">Peça Nova:</label>
          <input
            type="text"
            placeholder="Digite aqui:"
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Valor:</label>
          <input
            type="text"
            placeholder="R$ 0,00"
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="text-center">
          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
};

export default NovaTroca;
