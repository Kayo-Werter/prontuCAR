"use client";

import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Refuel } from '@/app/services/refuel/refuel';
import { Vehicle } from '@/app/services/vehicle/vehicle';

const EditarAbastecimento = () => {
  const params = useParams();
  const id = params?.id as string | undefined;
  const router = useRouter();

  const [formData, setFormData] = useState<Refuel>({
    price_gasoline: undefined,
    value_total: undefined,
    liters_gasoline: undefined,
    refuel_date: '',
    vehicle: '',
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
      axios.get(`http://localhost:8000/api/v1/refuel/${id}/`)
        .then((response) => {
          const refuelData = response.data;
          setFormData({
            ...refuelData,
            price_gasoline: refuelData.price_gasoline !== null ? parseFloat(refuelData.price_gasoline) : undefined,
            value_total: refuelData.value_total !== null ? parseFloat(refuelData.value_total) : undefined,
            liters_gasoline: refuelData.liters_gasoline !== null ? parseFloat(refuelData.liters_gasoline) : undefined,
          });
        })
        .catch((error) => {
          console.error('Erro ao obter dados de abastecimento:', error);
        });
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    // Converte os valores de string para número, se necessário
    const parsedValue = (name === 'price_gasoline' || name === 'value_total' || name === 'liters_gasoline')
      ? (value === '' ? undefined : parseFloat(value))
      : value;

    // Atualiza o estado do formulário
    setFormData((prevFormData) => {
      const updatedData = { ...prevFormData, [name]: parsedValue };

      // Calcula os litros de gasolina se price_gasoline e value_total estão definidos
      if (name === 'price_gasoline' || name === 'value_total') {
        const price_gasoline = parseFloat(updatedData.price_gasoline?.toString() || "0");
        const value_total = parseFloat(updatedData.value_total?.toString() || "0");

        if (price_gasoline > 0 && value_total > 0) {
          updatedData.liters_gasoline = parseFloat((value_total / price_gasoline).toFixed(2));
        } else {
          updatedData.liters_gasoline = undefined;
        }
      }

      return updatedData;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (id) {
      axios.put(`http://localhost:8000/api/v1/refuel/${id}/`, formData)
        .then(() => {
          alert('Abastecimento atualizado com sucesso!');
          router.push('/historicoAbastecimento'); // Redireciona de volta para a página de histórico
        })
        .catch((error) => {
          console.error('Erro ao atualizar o abastecimento:', error);
        });
    }
  };

  return (
    <div className="p-6 grid justify-items-center">
      <h1 className="text-2xl font-bold mb-6">Editar Abastecimento</h1>
      <form onSubmit={handleSubmit} className="space-y-2 w-full max-w-md">
        <div>
          <label htmlFor="price_gasoline" className="block text-sm font-medium">
            Valor da Gasolina
          </label>
          <input
            type="number"
            step="0.01"
            id="price_gasoline"
            name="price_gasoline"
            value={formData.price_gasoline ?? ''}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="value_total" className="block text-sm font-medium">
            Valor Total
          </label>
          <input
            type="number"
            step="0.01"
            id="value_total"
            name="value_total"
            value={formData.value_total ?? ''}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="liters_gasoline" className="block text-sm font-medium">
            Litros de Gasolina
          </label>
          <input
            type="number"
            step="0.01"
            id="liters_gasoline"
            name="liters_gasoline"
            value={formData.liters_gasoline ?? ''}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
            readOnly // Campo somente leitura, calculado automaticamente
          />
        </div>

        <div>
          <label htmlFor="refuel_date" className="block text-sm font-medium">
            Data do Abastecimento
          </label>
          <input
            type="date"
            id="refuel_date"
            name="refuel_date"
            value={formData.refuel_date}
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

        <div className="text-center">
          <button className="w-full bg-blue-600 text-white px-4 py-2 rounded mt-4" type="submit">
            Salvar Alterações
          </button>
          <button
            className="mt-4 w-full border-4 border-blue-600 text-blue-600 px-4 py-2 rounded"
            type="button"
            onClick={() => router.push('/historicoAbastecimento')}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditarAbastecimento;
