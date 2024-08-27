/* tela de novo veiculo */

"use client";

import React, { useState } from "react";
import { createVehicle } from "@/app/services/vehicle/vehicle";

const NovoVeiculo = () => {
  const [formData, setFormData] = useState({
    automobile: "",
    name: "",
    plate: "",
    document: "",
    buy_day: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const vehicleData = {
      ...formData,
      document: formData.document ? Number(formData.document) : undefined,
      buy_day: formData.buy_day || undefined,
    };

    try {
      await createVehicle(vehicleData);
      alert("Veículo criado com sucesso!");
    } catch (error) {
      console.error("Erro ao criar veículo:", error);
    }
  };

  return (
    <div className="p-6 grid justify-items-center">
      <h1 className="text-2xl font-bold mb-6">Novo Veículo</h1>
      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
        <div>
          <label className="block text-sm font-medium">Automóvel:</label>
          <select
            name="automobile"
            value={formData.automobile}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Selecione Veículo</option>
            <option value="Moto">Moto</option>
            <option value="Carro">Carro</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Data de Compra:</label>
          <input
            type="date"
            name="buy_day"
            value={formData.buy_day}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Documento:</label>
          <input
            type="text"
            name="document"
            value={formData.document}
            onChange={handleChange}
            placeholder="Insira Documento"
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Placa de Veículo:</label>
          <input
            type="text"
            name="plate"
            value={formData.plate}
            onChange={handleChange}
            placeholder="Lorem Ipsum"
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="text-center">
          <button className="w-full bg-blue-600 text-white px-4 py-2 rounded" type="submit">
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
};

export default NovoVeiculo;