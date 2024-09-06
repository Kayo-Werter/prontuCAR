
"use client"

import { useEffect, useState } from "react";
import { getRefuels, Refuel, deleteRefuel } from "../services/refuel/refuel";
import { useRouter } from "next/navigation";
import axios from "axios";
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Maintenance } from "../services/maintenance/maintenance";

const Manutencoes = () => {
  const [maintenances, setMaintenances] = useState<Maintenance[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  /*const [formData, setFormData] = useState({
    vehicle: "",
    value: "",
    description: "",
    local: "",
    maintenance_date: "",
  });
    

  const maintenanceData = {
    ...formData,
    value: parseFloat(formData.value), // Caso o valor seja uma string, converta para número
    maintenance_date: new Date(formData.maintenance_date), // Converte string para Date
  };*/

  const fetchMaintenances = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8000/api/v1/maintenance/');
      console.log('Dados recebidos na função fetchRefuels:', response.data);
      setMaintenances(response.data); // Ajuste conforme a estrutura da resposta da API
    } catch (error) {
      setError('Erro ao buscar Manutenção');
      console.error('Erro ao buscar Manutenção:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMaintenances();
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
        setMaintenances(maintenances.filter(maintenance => maintenance.id !== id));
      } catch (error) {
        console.error('Erro ao excluir abastecimento:', error);
      }
    }
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">MANUTENÇÕES</h1>
      <button className="bg-blue-600 text-white px-4 py-2 rounded-full mb-6" onClick={() => router.push('historicoManutencao/novaManutencao')}>
        + Nova Manutenção
      </button>
      <div className="space-y-4">
        {maintenances && maintenances.length > 0 ? (
          maintenances.map((maintenance) => (
            <div key={maintenance.id} className="bg-white p-4 rounded shadow-sm flex justify-between">
              <div>
                <p><strong>Data da manutenção:</strong> {maintenance.maintenance_date}</p>
                <p><strong>Local:</strong> {maintenance.local}</p>
                <p><strong>Valor:</strong> R$ {maintenance.value}</p>
                <p><strong>Veículo:</strong> {maintenance.vehicle}</p>
                <p><strong>Observações:</strong> {maintenance.description}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button className="text-yellow-500" onClick={() => handleEdit(maintenance.id)}>
                  <FaEdit />
                </button>
                <button className="text-red-500" onClick={() => handleDelete(maintenance.id)}>
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

