

"use client";

import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Vehicle } from '@/app/services/vehicle/vehicle';
import { Replacement } from '@/app/services/replacement/replacement';

const EditarPeca = () => {
  const params = useParams();
  const id = params?.id as string | undefined;
  const router = useRouter();

  const [formData, setFormData] = useState<Replacement>({
    vehicle: "",
    exchanged_part: "",
    value_part: "",
    replacement_day: "",
    description: "",
    local: "",
  });

  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

    useEffect(() => {
        // Obter lista de veículos
        axios.get('http://localhost:8000/api/v1/vehicle/')
            .then((response) => {
                setVehicles(response.data);
            })
            .catch((error) => {
                console.error('Erro ao obter lista de veículos:', error);
            });

        if (id) {
            axios.get(`http://localhost:8000/api/v1/replacement/${id}/`)
                .then((response) => {
                    setFormData(response.data);
                })
                .catch((error) => {
                    console.error('Erro ao obter dados de peça:', error);
                });
        }
    }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value,
    });
};

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const maintenanceData = {
      ...formData,
      replacement_day: new Date(formData.replacement_day), // Converte string para Date
    };


    if (id) {
      axios.put(`http://localhost:8000/api/v1/replacement/${id}/`, formData)
        .then(() => {
          alert('Peça atualizado com sucesso!');
          router.push('/pecas'); // Redireciona de volta para a página de histórico
        })
        .catch((error) => {
          console.error('Erro ao atualizar a Peça:', error);
        });
    }
  };

  return (
    <div className="p-6 grid justify-items-center">
      <h1 className="text-2xl font-bold mb-6">Editar Peça</h1>
      <form onSubmit={handleSubmit} className="space-y-2 w-full max-w-md">
        <div>
          <label htmlFor="replacement_day" className="block text-sm font-medium">
            Data da Peça:
          </label>
          <input
            type="date"
            id="replacement_day"
            name="replacement_day"
            value={formData.replacement_day}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="vehicle" className="block text-sm font-medium">
            Veículo
          </label>
          <select
                id="vehicle"
                name="vehicle"
                value={formData.vehicle}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
            >
                <option value="">Selecione um veículo</option>
                {vehicles.map((vehicle) => (
                    <option key={vehicle.id} value={vehicle.id}>
                        {vehicle.name}
                    </option>
                ))}
            </select>
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
          <label htmlFor="value_part" className="block text-sm font-medium">
            Valor:
          </label>
          <input
            type="text"
            id="value_part"
            name="value_part"
            value={formData.value_part}
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

export default EditarPeca;
