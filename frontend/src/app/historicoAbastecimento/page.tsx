
/*"use client"

import { useEffect, useState } from "react";
import { getRefuels, Refuel, deleteRefuel } from "../services/refuel/refuel";
import { useRouter } from "next/navigation";
import axios from "axios";
import { FaEdit, FaTrash } from 'react-icons/fa';
import DeleteConfirmationModal from "../components/deleteConfirmationModal";

const Abastecimentos = () => {
  const [refuels, setRefuels] = useState<Refuel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [selectedRefuel, setSelectedRefuel] = useState<Refuel | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  
  const fetchRefuels = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8000/api/v1/refuel/');
      console.log('Dados recebidos na função fetchRefuels:', response.data);
      setRefuels(response.data); // Ajuste conforme a estrutura da resposta da API
    } catch (error) {
      setError('Erro ao buscar abastecimentos');
      console.error('Erro ao buscar abastecimentos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRefuels();
  }, []);

  const handleEdit = (id?: number) => {
    if (id) {
      router.push(`/editarAbastecimento/${id}`);
    }
  };


  const handleDelete = async () => {
    if (selectedRefuel?.id) {
      try {
        await deleteRefuel(selectedRefuel.id);
        setRefuels(refuels.filter(refuel => refuel.id !== selectedRefuel.id));
        setIsModalOpen(false); // Fecha o modal após a exclusão
      } catch (error) {
        console.error('Erro ao excluir Manutenção:', error);
      }
    }
  };

  const openDeleteModal = (refuel: Refuel) => {
    setSelectedRefuel(refuel);
    setIsModalOpen(true); // Abre o modal
  };

  const closeDeleteModal = () => {
    setIsModalOpen(false); // Fecha o modal
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">ABASTECIMENTOS</h1>
      <button className="bg-blue-600 text-white px-4 py-2 rounded-full mb-6" onClick={() => router.push('historicoAbastecimento/novoAbastecimento')}>
        + Novo Abastecimento
      </button>
      <div className="space-y-4">
        {refuels && refuels.length > 0 ? (
          refuels.map((refuel) => (
            <div key={refuel.id} className="bg-white p-4 rounded shadow-sm flex justify-between">
              <div>
                <p><strong>Abastecido no dia:</strong> {refuel.refuel_date}</p>
                <p><strong>Valor do Combustível:</strong> R$ {refuel.price_gasoline}</p>
                <p><strong>Valor Total:</strong> R$ {refuel.value_total}</p>
                <p><strong>Litros de Combustível:</strong> {refuel.liters_gasoline}L</p>
                <p><strong>Veículo:</strong> {refuel.vehicle}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button className="text-yellow-500" onClick={() => handleEdit(refuel.id)}>
                  <FaEdit />
                </button>
                <button className="text-red-500" onClick={() => openDeleteModal(refuel)}>
                  <FaTrash />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Nenhum abastecimento encontrado.</p>
        )}
      </div>
        
      {selectedRefuel &&(
        <DeleteConfirmationModal
        isOpen={isModalOpen}
        refuel={selectedRefuel}
        onClose={closeDeleteModal}
        onDelete={handleDelete}
      />
      )}
    </div>
  );
};

export default Abastecimentos;*/


"use client"

import { useEffect, useState } from "react";
import { getRefuels, Refuel, deleteRefuel } from "../services/refuel/refuel";
import { useRouter } from "next/navigation";
import axios from "axios";
import { FaEdit, FaTrash } from 'react-icons/fa';
import DeleteConfirmationModal from "../components/deleteConfirmationModal";


const Abastecimentos = () => {
  const [refuels, setRefuels] = useState<Refuel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [selectedRefuel, setSelectedRefuel] = useState<Refuel | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const getToken = () => {
    return localStorage.getItem('token');
  };
  
  const fetchRefuels = async () => {
    setLoading(true);
    try {
      const token = getToken(); // Obtenha o token
      const response = await axios.get('http://localhost:8000/api/v1/refuel/', {
        headers: {
          Authorization: `Bearer ${token}`, // Adicione o token ao cabeçalho
        },
      });
      console.log('Dados recebidos na função fetchRefuels:', response.data);
      setRefuels(response.data.results); // Ajuste conforme a estrutura da resposta da API
    } catch (error) {
      setError('Erro ao buscar abastecimentos');
      console.error('Erro ao buscar abastecimentos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRefuels();
  }, []);

  const handleEdit = (id?: number) => {
    if (id) {
      router.push(`/editarAbastecimento/${id}`);
    }
  };


  const handleDelete = async () => {
    if (selectedRefuel?.id) {
      try {
        await deleteRefuel(selectedRefuel.id);
        setRefuels(refuels.filter(refuel => refuel.id !== selectedRefuel.id));
        setIsModalOpen(false); // Fecha o modal após a exclusão
      } catch (error) {
        console.error('Erro ao excluir Manutenção:', error);
      }
    }
  };

  const openDeleteModal = (refuel: Refuel) => {
    setSelectedRefuel(refuel);
    setIsModalOpen(true); // Abre o modal
  };

  const closeDeleteModal = () => {
    setIsModalOpen(false); // Fecha o modal
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">ABASTECIMENTOS</h1>
      <button className="bg-blue-600 text-white px-4 py-2 rounded-full mb-6" onClick={() => router.push('historicoAbastecimento/novoAbastecimento')}>
        + Novo Abastecimento
      </button>
      <div className="space-y-4">
        {refuels && refuels.length > 0 ? (
          refuels.map((refuel) => (
            <div key={refuel.id} className="bg-white p-4 rounded shadow-sm flex justify-between">
              <div>
                <p><strong>Abastecido no dia:</strong> {refuel.refuel_date}</p>
                <p><strong>Valor do Combustível:</strong> R$ {refuel.price_gasoline}</p>
                <p><strong>Valor Total:</strong> R$ {refuel.value_total}</p>
                <p><strong>Litros de Combustível:</strong> {refuel.liters_gasoline}L</p>
                <p><strong>Veículo:</strong> {refuel.vehicle}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button className="text-yellow-500" onClick={() => handleEdit(refuel.id)}>
                  <FaEdit />
                </button>
                <button className="text-red-500" onClick={() => openDeleteModal(refuel)}>
                  <FaTrash />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Nenhum abastecimento encontrado.</p>
        )}
      </div>
        
      {selectedRefuel &&(
        <DeleteConfirmationModal
        isOpen={isModalOpen}
        refuel={selectedRefuel}
        onClose={closeDeleteModal}
        onDelete={handleDelete}
      />
      )}
    </div>
  );
};

export default Abastecimentos;

