
"use client"

import { useEffect, useState } from "react";
import { getRefuels, Refuel, deleteRefuel } from "../services/refuel/refuel";
import { useRouter } from "next/navigation";
import axios from "axios";
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Maintenance } from "../services/maintenance/maintenance";
import { Vehicle } from "../services/vehicle/vehicle";

const Manutencoes = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  //const [vehicles, setVehicles] = useState<{ [key: number]: Vehicle }>({});
  

  const fetchVehicles = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8000/api/v1/vehicle/');
      console.log('Dados recebidos na função fetchRefuels:', response.data);
      setVehicles(response.data); // Ajuste conforme a estrutura da resposta da API
    } catch (error) {
      setError('Erro ao buscar Veículo');
      console.error('Erro ao buscar Veículo:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const handleEdit = (id?: number) => {
    if (id) {
      router.push(`/editarAbastecimento/${id}`);
    }
  };


  const handleDelete = async (id?: number) => {
    if (id) {
      try {
        await deleteRefuel(id);
        setVehicles(vehicles.filter(vehicle => vehicle.id !== id));
      } catch (error) {
        console.error('Erro ao excluir abastecimento:', error);
      }
    }
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Veículos</h1>
      <button className="bg-blue-600 text-white px-4 py-2 rounded-full mb-6" onClick={() => router.push('veiculos/cadastrarVeiculo')}>
        + Novo Veículo
      </button>
      <div className="space-y-4">
        {vehicles && vehicles.length > 0 ? (
          vehicles.map((vehicle) => (
            <div key={vehicle.id} className="bg-white p-4 rounded shadow-sm flex justify-between">
              <div>
                <p><strong>Automóvel:</strong> {vehicle.automobile}</p>
                <p><strong>Data de Compra:</strong> {vehicle.buy_day}</p>
                <p><strong>Documento:</strong> {vehicle.document}</p>
                <p><strong>Placa:</strong> {vehicle.plate}</p>
                <p><strong>Modelo:</strong>{vehicle.name}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button className="text-yellow-500" onClick={() => handleEdit(vehicle.id)}>
                  <FaEdit />
                </button>
                <button className="text-red-500" onClick={() => handleDelete(vehicle.id)}>
                  <FaTrash />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Nenhum abastecimento encontrado.</p>
        )}
      </div>
    </div>
  );
};

export default Manutencoes;

