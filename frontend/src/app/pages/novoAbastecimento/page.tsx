
/*"use client";

import { createMaintenance } from "@/app/services/api";
import React, { useState } from "react";


const NovoAbastecimento = () => {
  const [formData, setFormData] = useState({
    vehicle: "",
    value: "",
    description: "",
    local: "",
    maintenance_date: "",
  });


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();


    // Converta a data para um objeto Date
    const maintenanceData = {
      ...formData,
      value: parseFloat(formData.value), // Caso o valor seja uma string, converta para número
      maintenance_date: new Date(formData.maintenance_date), // Converte string para Date
    };


    try {
      await createMaintenance(maintenanceData);
      alert("Manutenção criada com sucesso!");
    } catch (error) {
      console.error("Erro ao criar manutenção:", error);
    }
  };


  return (
    <div className="p-6 grid justify-items-center">
      <h1 className="text-2xl font-bold mb-6">Novo Abastecimento</h1>
      <form onSubmit={handleSubmit} className="space-y-2 w-full max-w-md">
        <div>
          <label className="block text-sm font-medium">Abastecimento do dia</label>
          <input
            type="date"
            name="maintenance_date"
            value={formData.maintenance_date}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Veículo</label>
          <input
            type="text"
            name="vehicle"
            value={formData.vehicle}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium">Valor da Gasolina</label>
          <input
            type="text"
            name="value"
            value={formData.value}
            onChange={handleChange}
            placeholder="R$ 0,00"
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Valor Total</label>
          <input
            type="text"
            name="value"
            value={formData.value}
            onChange={handleChange}
            placeholder="R$ 0,00"
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Litros de Gasolina</label>
          <input
            type="text"
            name="value"
            value={formData.value}
            onChange={handleChange}
            placeholder="R$ 0,00"
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


export default NovoAbastecimento;

*/
"use client";

import React, { useState } from "react";
import { createMaintenance } from "@/app/services/api";


const NovoAbastecimento = () => {
  const [formData, setFormData] = useState({
    vehicle: "",
    value: "",
    description: "",
    local: "",
    maintenance_date: "",
  });


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();


    // Converta a data para um objeto Date
    const maintenanceData = {
      ...formData,
      value: parseFloat(formData.value), // Caso o valor seja uma string, converta para número
      maintenance_date: new Date(formData.maintenance_date), // Converte string para Date
    };


    try {
      await createMaintenance(maintenanceData);
      alert("Manutenção criada com sucesso!");
    } catch (error) {
      console.error("Erro ao criar manutenção:", error);
    }
  };


  return (
    <div className="p-6 grid justify-items-center">
      <h1 className="text-2xl font-bold mb-6">Novo Abastecimento</h1>
      <form onSubmit={handleSubmit} className="space-y-2 w-full max-w-md">
        <div>
          <label className="block text-sm font-medium">Abastecimento do dia</label>
          <input
            type="date"
            name="maintenance_date"
            value={formData.maintenance_date}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Veículo</label>
          <input
            type="text"
            name="vehicle"
            value={formData.vehicle}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium">Valor da Gasolina</label>
          <input
            type="text"
            name="value"
            value={formData.value}
            onChange={handleChange}
            placeholder="R$ 0,00"
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Valor Total</label>
          <input
            type="text"
            name="value"
            value={formData.value}
            onChange={handleChange}
            placeholder="R$ 0,00"
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Litros de Gasolina</label>
          <input
            type="text"
            name="value"
            value={formData.value}
            onChange={handleChange}
            placeholder="R$ 0,00"
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


export default NovoAbastecimento;

