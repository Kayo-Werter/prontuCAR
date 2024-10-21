"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { FaEdit, FaTrash } from 'react-icons/fa';
import { deleteMaintenance, Maintenance } from "../services/maintenance/maintenance";
import DeleteConfirmationModal from "../components/deleteConfirmationModal";
import { getVehicles, Vehicle } from "../services/vehicle/vehicle";


const Manutencoes = () => {
  const [maintenances, setMaintenances] = useState<Maintenance[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMaintenance, setSelectedMaintenance] = useState<Maintenance | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const router = useRouter();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);


  const fetchMaintenances = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8000/api/v1/maintenance/');
      setMaintenances(response.data);
    } catch (error) {
      setError('Erro ao buscar Manutenção');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMaintenances();
  }, []);

  const handleEdit = (id?: number) => {
    if (id) {
      router.push(`/editarManutencao/${id}`);
    }
  };

  const handleDelete = async () => {
    if (selectedMaintenance?.id) {
      try {
        await deleteMaintenance(selectedMaintenance.id);
        setMaintenances(maintenances.filter(maintenance => maintenance.id !== selectedMaintenance.id));
        setIsModalOpen(false); // Fecha o modal após a exclusão
      } catch (error) {
        console.error('Erro ao excluir Manutenção:', error);
      }
    }
  };

  const openDeleteModal = (maintenance: Maintenance) => {
    setSelectedMaintenance(maintenance);
    setIsModalOpen(true); // Abre o modal
  };

  const closeDeleteModal = () => {
    setIsModalOpen(false); // Fecha o modal
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
                <button className="text-red-500" onClick={() => openDeleteModal(maintenance)}>
                  <FaTrash />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Nenhuma manutenção encontrado.</p>
        )}
      </div>

      {/* Modal de confirmação de exclusão */}
      {selectedMaintenance && (
        <DeleteConfirmationModal
          isOpen={isModalOpen}
          maintenance={selectedMaintenance}
          onClose={closeDeleteModal}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default Manutencoes;

/*"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaEdit, FaTrash } from 'react-icons/fa';
import { deleteMaintenance, Maintenance, getMaintenance } from "../services/maintenance/maintenance";
import DeleteConfirmationModal from "../components/deleteConfirmationModal";
import { getVehicles, Vehicle } from "../services/vehicle/vehicle";

const Manutencoes = () => {
    const [maintenances, setMaintenances] = useState<Maintenance[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedMaintenance, setSelectedMaintenance] = useState<Maintenance | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const router = useRouter();

    const fetchMaintenances = async () => {
        setLoading(true);
        try {
            const data = await getMaintenance();
            setMaintenances(data);
        } catch (error) {
            setError('Erro ao buscar Manutenção');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMaintenances();
    }, []);

    const handleEdit = (id?: number) => {
        if (id) {
            router.push(`/editarManutencao/${id}`);
        }
    };

    const handleDelete = async () => {
        if (selectedMaintenance?.id) {
            try {
                await deleteMaintenance(selectedMaintenance.id);
                setMaintenances(maintenances.filter(maintenance => maintenance.id !== selectedMaintenance.id));
                setIsModalOpen(false); // Fecha o modal após a exclusão
            } catch (error) {
                console.error('Erro ao excluir Manutenção:', error);
            }
        }
    };

    const openDeleteModal = (maintenance: Maintenance) => {
        setSelectedMaintenance(maintenance);
        setIsModalOpen(true); // Abre o modal
    };

    const closeDeleteModal = () => {
        setIsModalOpen(false); // Fecha o modal
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
                                <button className="text-red-500" onClick={() => openDeleteModal(maintenance)}>
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Nenhuma manutenção encontrada.</p>
                )}
            </div>

            
            {selectedMaintenance && (
                <DeleteConfirmationModal
                    isOpen={isModalOpen}
                    maintenance={selectedMaintenance}
                    onClose={closeDeleteModal}
                    onDelete={handleDelete}
                />
            )}
        </div>
    );
};

export default Manutencoes;
*/