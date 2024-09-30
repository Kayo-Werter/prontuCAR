
"use client";

import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Vehicle } from '@/app/services/vehicle/vehicle';
import { Maintenance } from '@/app/services/maintenance/maintenance';

const EditarManutencao = () => {
  const params = useParams();
  const id = params?.id as string | undefined;
  const router = useRouter();

  const [formData, setFormData] = useState<Maintenance>({
      vehicle: '',
      value: 0,
      description: '',
      local: '',
      maintenance_date: '',
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
          axios.get(`http://localhost:8000/api/v1/maintenance/${id}/`)
              .then((response) => {
                  setFormData(response.data);
              })
              .catch((error) => {
                  console.error('Erro ao obter dados de manutenção:', error);
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

      if (id) {
          axios.put(`http://localhost:8000/api/v1/maintenance/${id}/`, formData)
              .then(() => {
                  alert('Manutenção atualizada com sucesso!');
                  router.push('/historicoManutencao'); // Redireciona para a página de histórico
              })
              .catch((error) => {
                  console.error('Erro ao atualizar a manutenção:', error);
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
                  <label htmlFor="value" className="block text-sm font-medium">
                      Valor:
                  </label>
                  <input
                      type="number"
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
                  <button
                      className="mt-4 w-full border-4 border-blue-600 text-blue-600 px-4 py-2 rounded"
                      type="button"
                      onClick={() => router.push('/historicoManutencao')}
                  >
                      Cancelar
                  </button>
              </div>
          </form>
      </div>
  );
};

export default EditarManutencao;
