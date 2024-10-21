

/*"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { FaEdit, FaTrash } from 'react-icons/fa';
import { deleteReplacement, Replacement } from "../services/replacement/replacement";
import DeleteConfirmationModal from "../components/deleteConfirmationModal";
import { Maintenance } from "../services/maintenance/maintenance";

const ListaPecas = () => {
  const [replacements, setReplacements] = useState<Replacement[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedReplacement, setSelectedReplacement] = useState<Replacement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const router = useRouter();

  
  

  const fetchReplacements = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8000/api/v1/replacement/');
      setReplacements(response.data);
    } catch (error) {
      setError('Erro ao buscar Peça');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReplacements();
  }, []);

  const handleEdit = (id?: number) => {
    if (id) {
      router.push(`/editarPeca/${id}`);
    }
  };

  const handleDelete = async () => {
    if (selectedReplacement?.id) {
      try {
        await deleteReplacement(selectedReplacement.id);
        setReplacements(replacements.filter(replacement => replacement.id !== selectedReplacement.id));
        setIsModalOpen(false); // Fecha o modal após a exclusão
      } catch (error) {
        console.error('Erro ao excluir peça:', error);
      }
    }
  };

  const openDeleteModal = (replacement: Replacement) => {
    setSelectedReplacement(replacement);
    setIsModalOpen(true); // Abre o modal
  };

  const closeDeleteModal = () => {
    setIsModalOpen(false); // Fecha o modal
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">PEÇAS TROCADAS</h1>
      <button className="bg-blue-600 text-white px-4 py-2 rounded-full mb-6" onClick={() => router.push('pecas/novaPeca')}>
        + Nova Peça
      </button>
      <div className="space-y-4">
        {replacements && replacements.length > 0 ? (
          replacements.map((replacement) => (
            <div key={replacement.id} className="bg-white p-4 rounded shadow-sm flex justify-between">
              <div>
                <p><strong>Veículo:</strong> {replacement.vehicle}</p>
                <p><strong>Data da troca:</strong> {replacement.replacement_day}</p>
                <p><strong>Valor:</strong> R$ {replacement.value_part}</p>
                <p><strong>Local:</strong> {replacement.local}</p>
                <p><strong>Peça nova:</strong>{replacement.exchanged_part}</p>
                <p><strong>Observação:</strong>{replacement.description}</p>

                
              </div>
              <div className="flex items-center space-x-2">
                <button className="text-yellow-500" onClick={() => handleEdit(replacement.id)}>
                  <FaEdit />
                </button>
                <button className="text-red-500" onClick={() => openDeleteModal(replacement)}>
                  <FaTrash />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Nenhuma peça encontrada.</p>
        )}
      </div>

      {/* Modal de confirmação de exclusão *//*
      {selectedReplacement && (
        <DeleteConfirmationModal
          isOpen={isModalOpen}
          replacement={selectedReplacement}
          onClose={closeDeleteModal}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default ListaPecas;*/




"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { FaEdit, FaTrash } from 'react-icons/fa';
import { deleteReplacement, Replacement } from "../services/replacement/replacement";
import DeleteConfirmationModal from "../components/deleteConfirmationModal";
import { Maintenance } from "../services/maintenance/maintenance";

const ListaPecas = () => {
  const [replacements, setReplacements] = useState<Replacement[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedReplacement, setSelectedReplacement] = useState<Replacement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const router = useRouter();

  /*const [formData, setFormData] = useState({
    id: "",
    vahicle: "",
    exchanged_part: "",
    value_part: "",
    replacement_day: "",
  });*/
  const getToken = () => {
    return localStorage.getItem('token');
  };

  const fetchReplacements = async () => {
    setLoading(true);
    try {
      const token = getToken(); // Obtenha o token
      const response = await axios.get('http://localhost:8000/api/v1/replacement/', {
        headers: {
          Authorization: `Bearer ${token}`, // Adicione o token ao cabeçalho
        },
      });
      setReplacements(response.data);
    } catch (error) {
      setError('Erro ao buscar Peça');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReplacements();
  }, []);

  const handleEdit = (id?: number) => {
    if (id) {
      router.push(`/editarPeca/${id}`);
    }
  };

  const handleDelete = async () => {
    if (selectedReplacement?.id) {
      try {
        await deleteReplacement(selectedReplacement.id);
        setReplacements(replacements.filter(replacement => replacement.id !== selectedReplacement.id));
        setIsModalOpen(false); // Fecha o modal após a exclusão
      } catch (error) {
        console.error('Erro ao excluir peça:', error);
      }
    }
  };

  const openDeleteModal = (replacement: Replacement) => {
    setSelectedReplacement(replacement);
    setIsModalOpen(true); // Abre o modal
  };

  const closeDeleteModal = () => {
    setIsModalOpen(false); // Fecha o modal
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">PEÇAS TROCADAS</h1>
      <button className="bg-blue-600 text-white px-4 py-2 rounded-full mb-6" onClick={() => router.push('pecas/novaPeca')}>
        + Nova Peça
      </button>
      <div className="space-y-4">
        {replacements && replacements.length > 0 ? (
          replacements.map((replacement) => (
            <div key={replacement.id} className="bg-white p-4 rounded shadow-sm flex justify-between">
              <div>
                <p><strong>Veículo:</strong> {replacement.vehicle}</p>
                <p><strong>Data da troca:</strong> {replacement.replacement_day}</p>
                <p><strong>Valor:</strong> R$ {replacement.value_part}</p>
                <p><strong>Local:</strong> {replacement.local}</p>
                <p><strong>Peça nova:</strong>{replacement.exchanged_part}</p>
                <p><strong>Observação:</strong>{replacement.description}</p>

                
              </div>
              <div className="flex items-center space-x-2">
                <button className="text-yellow-500" onClick={() => handleEdit(replacement.id)}>
                  <FaEdit />
                </button>
                <button className="text-red-500" onClick={() => openDeleteModal(replacement)}>
                  <FaTrash />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Nenhuma peça encontrada.</p>
        )}
      </div>

      {/* Modal de confirmação de exclusão */}
      {selectedReplacement && (
        <DeleteConfirmationModal
          isOpen={isModalOpen}
          replacement={selectedReplacement}
          onClose={closeDeleteModal}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default ListaPecas;


