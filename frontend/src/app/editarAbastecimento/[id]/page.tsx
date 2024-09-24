

"use client";

import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';



// Defina uma interface para os dados do formulário
interface FormData {
  price_gasoline: string;
  value_total: string;
  liters_gasoline: string;
  refuel_date: string;
  vehicle: string;
}

const EditarAbastecimento = () => {
  const params = useParams();
  const id = params?.id as string | undefined;
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    price_gasoline: '',
    value_total: '',
    liters_gasoline: '',
    refuel_date: '',
    vehicle: '',
  });

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8000/api/v1/refuel/${id}/`)
        .then((response) => {
          setFormData(response.data);
        })
        .catch((error) => {
          console.error('Erro ao obter dados do abastecimento:', error);
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

    const refuelData = {
      ...formData,
      refuel_date: new Date(formData.refuel_date), // Converte string para Date
    };


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
            type="text"
            id="price_gasoline"
            name="price_gasoline"
            value={formData.price_gasoline}
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
            type="text"
            id="value_total"
            name="value_total"
            value={formData.value_total}
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
            type="text"
            id="liters_gasoline"
            name="liters_gasoline"
            value={formData.liters_gasoline}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
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

        <div className="text-center">
          <button className="w-full bg-blue-600 text-white px-4 py-2 rounded mt-4" type="submit">
            Salvar Alterações
          </button>
          <button className="mt-4 w-full border-4 border-blue-600 text-blue-600 px-4 py-2 rounded" type="submit" onClick={() => router.push('/historicoAbastecimento')} >
              Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditarAbastecimento;
