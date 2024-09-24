

"use client";

import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';



// Defina uma interface para os dados do formulário
interface FormData {
    maintenance_date: string;
    local: string;
    value: string;
    vehicle: string;
    description: string;
}

const EditarManutencao = () => {
  const params = useParams();
  const id = params?.id as string | undefined;
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    maintenance_date: '',
    local: '',
    value: '',
    vehicle: '',
    description: '',
  });

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8000/api/v1/maintenance/${id}/`)
        .then((response) => {
          setFormData(response.data);
        })
        .catch((error) => {
          console.error('Erro ao obter dados de manutenção:', error);
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

    const maintenanceData = {
      ...formData,
      maintenance_date: new Date(formData.maintenance_date), // Converte string para Date
    };


    if (id) {
      axios.put(`http://localhost:8000/api/v1/maintenance/${id}/`, formData)
        .then(() => {
          alert('Manutenção atualizado com sucesso!');
          router.push('/historicoManutencao'); // Redireciona de volta para a página de histórico
        })
        .catch((error) => {
          console.error('Erro ao atualizar a Manutenção:', error);
        });
    }
  };

  return (
    <div className="p-6 grid justify-items-center">
      <h1 className="text-2xl font-bold mb-6">Editar Manutenção</h1>
      <form onSubmit={handleSubmit} className="space-y-2 w-full max-w-md">
        <div>
          <label htmlFor="maintenance_date" className="block text-sm font-medium">
            Data da manutenção:
          </label>
          <input
            type="date"
            id="maintenance_date"
            name="maintenance_date"
            value={formData.maintenance_date}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="vehicle" className="block text-sm font-medium">
            Veículo
          </label>
          <input
            type="text"
            id="vehicle"
            name="vehicle"
            value={formData.vehicle}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium">
            Observações:
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="local" className="block text-sm font-medium">
            Local:
          </label>
          <input
            type="text"
            id="local"
            name="local"
            value={formData.local}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="value" className="block text-sm font-medium">
            Valor:
          </label>
          <input
            type="text"
            id="value"
            name="value"
            value={formData.value}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="text-center">
          <button className="w-full bg-blue-600 text-white px-4 py-2 rounded mt-4" type="submit">
            Salvar Alterações
          </button>
          <button className="mt-4 w-full border-4 border-blue-600 text-blue-600 px-4 py-2 rounded" type="submit" >
              Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditarManutencao;
