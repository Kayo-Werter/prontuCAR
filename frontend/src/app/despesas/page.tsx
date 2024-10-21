/* instalar a biblioteca para o grafico: npm install react-chartjs-2 chart.js */

/*"use client";

import { CategoryScale, Chart, Filler, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js';
import { useEffect, useState } from 'react';
import { Line } from "react-chartjs-2";
import { getVehicleExpenses, getVehicleExpensesById, VehicleExpense } from '../services/vehicle/VehicleExpense';


// Registrando os componentes do Chart.js
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const DespesasPage = () => {
  const [loading, setLoading] = useState(true);
  const [selectedVehicle, setSelectedVehicle] = useState<number | null>(null);
  const [vehicleExpenses, setVehicleExpenses] = useState<VehicleExpense[]>([]);
  const [selectedExpenseData, setSelectedExpenseData] = useState<VehicleExpense | null>(null);
  

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const data = await getVehicleExpenses();
        console.log('Dados de despesas:', data);
        setVehicleExpenses(data);
      } catch (error) {
        console.error("Erro ao buscar despesas do veículo", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  useEffect(() => {
    const fetchExpenseById = async () => {
      if (selectedVehicle !== null) {
        setLoading(true);
        try {
          const data = await getVehicleExpensesById(selectedVehicle);
          console.log('Dados de despesas do veículo selecionado:', data);
          setSelectedExpenseData(data); // Acessa o primeiro elemento do array
        } catch (error) {
          console.error("Erro ao buscar despesas do veículo pelo ID", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchExpenseById();
  }, [selectedVehicle]);

  // Processar dados para o gráfico
  const chartData = {
    labels: ['Abastecimentos', 'Manutenções', 'Peças Trocas'], // Adicione outros
    datasets: [
      {
        label: 'Despesas (R$)',
        data: selectedExpenseData ? [
          selectedExpenseData.expenses?.total_refuels ? parseFloat(selectedExpenseData.expenses.total_refuels.replace(',', '.')) : 0,
          selectedExpenseData.expenses?.total_maintenances ? parseFloat(selectedExpenseData.expenses.total_maintenances.replace(',', '.')) : 0,
          selectedExpenseData.expenses?.total_replacements ? parseFloat(selectedExpenseData.expenses.total_replacements.replace(',', '.')) : 0
        ] : [],
        fill: true,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: true,
        text: 'Despesas por Categoria',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value: string | number) {
            return 'R$ ' + value;
          }
        }
      }
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!vehicleExpenses || vehicleExpenses.length === 0) {
    return <p>No data available</p>;
  }
  
  const handleVehicleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = Number(e.target.value);
    setSelectedVehicle(value);
  };

  return (
    <div className="flex flex-col items-center p-6 bg-blue-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">DESPESAS</h1>

      {/* Formulário para seleção de veículo *//*
      <form className="mb-6">
        <div className="flex space-x-4">
          <select
            name="vehicle_name"
            value={selectedVehicle || ""}
            onChange={handleVehicleChange}
            className="border p-2 rounded">
            <option value="">Selecione um veículo</option>
            {vehicleExpenses.map((vehicleExpense) => (
              <option key={vehicleExpense.vehicle_id} value={vehicleExpense.vehicle_id}>
                {vehicleExpense.vehicle_name}
              </option>
            ))}
          </select>
        </div>
      </form>

      {/* Cartões de Despesas *//*
      <div className="grid grid-cols-4 gap-4 mb-6 w-full max-w-screen-lg">
        <div className="bg-blue-400 text-white p-4 rounded shadow-lg">
          <p>Abastecimentos</p>
          <h2 className="text-2xl font-bold">R$ {selectedExpenseData?.expenses?.total_refuels || "0,00"}</h2>
        </div>
        <div className="bg-red-400 text-white p-4 rounded shadow-lg">
          <p>Manutenções</p>
          <h2 className="text-2xl font-bold">R$ {selectedExpenseData?.expenses?.total_maintenances || "0,00"}</h2>
        </div>
        <div className="bg-green-400 text-white p-4 rounded shadow-lg">
          <p>Peças trocadas</p>
          <h2 className="text-2xl font-bold">R$ {selectedExpenseData?.expenses?.total_replacements || "0,00"}</h2>
        </div>
        <div className="bg-yellow-400 text-white p-4 rounded shadow-lg">
          <p>Total</p>
          <h2 className="text-2xl font-bold">R$ {selectedExpenseData?.expenses?.total || "0,00"}</h2>
        </div>
      </div>

      {/* Gráfico *//*
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-screen-lg">
        <h2 className="text-lg font-semibold mb-4">Gráfico de Despesas:</h2>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default DespesasPage;*/

/* instalar a biblioteca para o grafico: npm install react-chartjs-2 chart.js */

"use client";

import { CategoryScale, Chart, Filler, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js';
import { useEffect, useState } from 'react';
import { Line } from "react-chartjs-2";
import { getVehicleExpenses, getVehicleExpensesById, VehicleExpense } from '../services/vehicle/VehicleExpense';
import axios from 'axios';

// Registrando os componentes do Chart.js
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const DespesasPage = () => {
  const [loading, setLoading] = useState(true);
  const [selectedVehicle, setSelectedVehicle] = useState<number | null>(null);
  const [vehicleExpenses, setVehicleExpenses] = useState<VehicleExpense[]>([]);
  const [selectedExpenseData, setSelectedExpenseData] = useState<VehicleExpense | null>(null);
  const [error, setError] = useState<string | null>(null);
  const getToken = () => {
    return localStorage.getItem('token');
  };

  const fetchReplacements = async () => {
    setLoading(true);
    try {
      const token = getToken(); // Obtenha o token
      const response = await axios.get('http://localhost:8000/api/v1/expense/', {
        headers: {
          Authorization: `Bearer ${token}`, // Adicione o token ao cabeçalho
        },
      });
      setVehicleExpenses(response.data);
    } catch (error) {
      setError('Erro ao buscar despesas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReplacements();
  }, []);

  useEffect(() => {
    const fetchExpenseById = async () => {
      if (selectedVehicle !== null) {
        setLoading(true);
        try {
          const data = await getVehicleExpensesById(selectedVehicle);
          console.log('Dados de despesas do veículo selecionado:', data);
          setSelectedExpenseData(data); // Acessa o primeiro elemento do array
        } catch (error) {
          console.error("Erro ao buscar despesas do veículo pelo ID", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchExpenseById();
  }, [selectedVehicle]);

  // Processar dados para o gráfico
  const chartData = {
    labels: ['Abastecimentos', 'Manutenções', 'Peças Trocas'], // Adicione outros
    datasets: [
      {
        label: 'Despesas (R$)',
        data: selectedExpenseData ? [
          selectedExpenseData.expenses?.total_refuels ? parseFloat(selectedExpenseData.expenses.total_refuels.replace(',', '.')) : 0,
          selectedExpenseData.expenses?.total_maintenances ? parseFloat(selectedExpenseData.expenses.total_maintenances.replace(',', '.')) : 0,
          selectedExpenseData.expenses?.total_replacements ? parseFloat(selectedExpenseData.expenses.total_replacements.replace(',', '.')) : 0
        ] : [],
        fill: true,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: true,
        text: 'Despesas por Categoria',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value: string | number) {
            return 'R$ ' + value;
          }
        }
      }
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!vehicleExpenses || vehicleExpenses.length === 0) {
    return <p>No data available</p>;
  }
  
  const handleVehicleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = Number(e.target.value);
    setSelectedVehicle(value);
  };

  return (
    <div className="flex flex-col items-center p-6 bg-blue-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">DESPESAS</h1>

      {/* Formulário para seleção de veículo */}
      <form className="mb-6">
        <div className="flex space-x-4">
          <select
            name="vehicle_name"
            value={selectedVehicle || ""}
            onChange={handleVehicleChange}
            className="border p-2 rounded">
            <option value="">Selecione um veículo</option>
            {vehicleExpenses.map((vehicleExpense) => (
              <option key={vehicleExpense.vehicle_id} value={vehicleExpense.vehicle_id}>
                {vehicleExpense.vehicle_name}
              </option>
            ))}
          </select>
        </div>
      </form>

      {/* Cartões de Despesas */}
      <div className="grid grid-cols-4 gap-4 mb-6 w-full max-w-screen-lg">
        <div className="bg-blue-400 text-white p-4 rounded shadow-lg">
          <p>Abastecimentos</p>
          <h2 className="text-2xl font-bold">R$ {selectedExpenseData?.expenses?.total_refuels || "0,00"}</h2>
        </div>
        <div className="bg-red-400 text-white p-4 rounded shadow-lg">
          <p>Manutenções</p>
          <h2 className="text-2xl font-bold">R$ {selectedExpenseData?.expenses?.total_maintenances || "0,00"}</h2>
        </div>
        <div className="bg-green-400 text-white p-4 rounded shadow-lg">
          <p>Peças trocadas</p>
          <h2 className="text-2xl font-bold">R$ {selectedExpenseData?.expenses?.total_replacements || "0,00"}</h2>
        </div>
        <div className="bg-yellow-400 text-white p-4 rounded shadow-lg">
          <p>Total</p>
          <h2 className="text-2xl font-bold">R$ {selectedExpenseData?.expenses?.total || "0,00"}</h2>
        </div>
      </div>

      {/* Gráfico */}
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-screen-lg">
        <h2 className="text-lg font-semibold mb-4">Gráfico de Despesas:</h2>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default DespesasPage;