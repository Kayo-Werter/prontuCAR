/* para implementar mascara: npm install react-input-mask */
"use client";

import { createMaintenance } from "@/app/services/maintenance/maintenance";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Vehicle } from "../../services/vehicle/vehicle";
import { useRouter } from "next/navigation";

const NovaManutencao = () => {
  const [formData, setFormData] = useState({
    vehicle: "",
    value: "",
    description: "",
    local: "",
    maintenance_date: "",
  });

  const router = useRouter();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  const fetchVehicles = async () => {
    try {
        const response = await axios.get('http://localhost:8000/api/v1/vehicle/');
        console.log('Dados dos veículos:', response.data); // Verifique o conteúdo da resposta
        setVehicles(response.data); // Ajuste conforme a estrutura da resposta da API
    } catch (error) {
        console.error('Erro ao buscar veículos:', error);
    }
};

useEffect(() => {
    fetchVehicles(); // Chama a função ao montar o componente
}, []);

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
      //maintenance_date: new Date(formData.maintenance_date), // Converte string para Date
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
      <h1 className="text-2xl font-bold mb-6">Nova Manutenção</h1>
      <form onSubmit={handleSubmit} className="space-y-2 w-full max-w-md">
        <div>
          <label className="block text-sm font-medium">Data da manutenção:</label>
          <input
            type="date"
            name="maintenance_date"
            value={formData.maintenance_date}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
            <label className="block text-sm font-medium">Tipo de Veículo</label>
            <select
              name="vehicle"
              value={formData.vehicle}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Selecione um tipo de veículo</option>
              {vehicles.map((vehicle) => (
                <option key={vehicle.id} value={vehicle.id}>
                  {vehicle.name}
                </option>
              ))}
            </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Observações:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Digite aqui:"
            className="w-full p-2 border rounded"
            rows={4}
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium">Local:</label>
          <input
            type="text"
            name="local"
            value={formData.local}
            onChange={handleChange}
            placeholder="Digite aqui:"
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Valor:</label>
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
          <button className="w-full bg-blue-600 text-white px-4 py-2 rounded" type="submit" onClick={() => router.push('/historicoManutencao')}>
            Salvar
          </button>
          <button className="mt-4 w-full border-4 border-blue-600 text-blue-600 px-4 py-2 rounded" type="submit" onClick={() => router.push('/historicoManutencao')} >
              Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};


export default NovaManutencao;

