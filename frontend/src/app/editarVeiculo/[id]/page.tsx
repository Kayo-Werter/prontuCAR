

"use client";

import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';



// Defina uma interface para os dados do formulário
interface FormData {
    automobile: string;
    name: string;
    plate: string;
    document: string;
    buy_day: string;
}

const EditarVeiculo = () => {
  const params = useParams();
  const id = params?.id as string | undefined;
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    automobile: '',
    name: '',
    plate: '',
    document: '',
    buy_day: '',
  });

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8000/api/v1/vehicle/${id}/`)
        .then((response) => {
          setFormData(response.data);
        })
        .catch((error) => {
          console.error('Erro ao obter dados de veículo:', error);
        });
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const vehicleData = {
      ...formData,
      buy_day: new Date(formData.buy_day), // Converte string para Date
    };


    if (id) {
      axios.put(`http://localhost:8000/api/v1/vehicle/${id}/`, formData)
        .then(() => {
          alert('Veículo atualizado com sucesso!');
          router.push('/veiculos'); // Redireciona de volta para a página de histórico
        })
        .catch((error) => {
          console.error('Erro ao atualizar veículo:', error);
        });
    }
  };

  return (
    <div className="p-6 grid justify-items-center">
      <h1 className="text-2xl font-bold mb-6">Editar Veículo</h1>
      <form onSubmit={handleSubmit} className="space-y-2 w-full max-w-md">
        <div>
          <label htmlFor="automobile" className="block text-sm font-medium">
            Automóvel:
          </label>
          <input
            type="text"
            id="automobile"
            name="automobile"
            value={formData.automobile}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="buy_day" className="block text-sm font-medium">
            Data de Compra:
          </label>
          <input
            type="date"
            id="buy_day"
            name="buy_day"
            value={formData.buy_day}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="document" className="block text-sm font-medium">
            Documento:
          </label>
          <input
            type="text"
            id="document"
            name="document"
            value={formData.document}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="plate" className="block text-sm font-medium">
            Placa:
          </label>
          <input
            type="text"
            id="plate"
            name="plate"
            value={formData.plate}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="name" className="block text-sm font-medium">
            Modelo:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="text-center">
          <button className="w-full bg-blue-600 text-white px-4 py-2 rounded mt-4" type="submit">
            Salvar Alterações
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditarVeiculo;
