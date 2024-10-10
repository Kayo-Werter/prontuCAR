"use client";

import { useEffect, useState } from 'react';
import { CategoryScale, Chart, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js';
import { Line } from "react-chartjs-2";
import { getVehicleExpenses } from '../services/vehicle/VehicleExpense'; // Atualize o caminho conforme necessário
import { Vehicle } from '../services/vehicle/vehicle';
import { VehicleExpense } from '../services/vehicle/VehicleExpense';
import { getVehicles } from '../services/vehicle/vehicle';
import axios from 'axios';
// Registrando os componentes do Chart.js
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const DespesasPage = () => {
  //const [expensesData, setExpensesData] = useState<VehicleExpense[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVehicle, setSelectedVehicle] = useState<number | null>(null); // Estado para o veículo selecionado
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [vehicleExpenses, setVehicleExpenses] = useState<VehicleExpense[]>([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/vehicle/');
        console.log('Dados recebidos na função fetchVehicles:', response.data);
        setVehicles(response.data);
      } catch (error) {
        console.error("Erro ao buscar veículos:", error);
      }
    };

    fetchVehicles();
  }, []);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const data = await getVehicleExpenses(); // Chame a função que retorna todas as despesas
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

  // Filtrar despesas com base no veículo selecionado
  const selectedExpenseData = selectedVehicle !== null
    ? vehicleExpenses.find(expense => expense.vehicle_id === selectedVehicle)
    : null;

  // Somar os valores das despesas para exibir nos cartões
  const totalRefuels = selectedExpenseData
    ? selectedExpenseData.refuels_data.reduce((sum, refuel) => sum + refuel.price, 0)
    : 0;

  const totalMaintenances = selectedExpenseData
    ? selectedExpenseData.maintenances_data.reduce((sum, maintenance) => sum + maintenance.price, 0)
    : 0;

  const totalReplacements = selectedExpenseData
    ? selectedExpenseData.replacements.reduce((sum, replacement) => sum + replacement.price, 0)
    : 0;

  const totalExpenses = totalRefuels + totalMaintenances + totalReplacements;

  // Processar dados para o gráfico
  const chartData = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'], // Ajuste conforme necessário
    datasets: [
      {
        label: 'Despesas (R$)',
        data: selectedExpenseData ? selectedExpenseData.refuels_data.map(refuel => refuel.price) : [], // Exemplo para abastecimentos
        fill: true,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
      },
    ],
  };

   // Opções do gráfico
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value: string | number) { // Define o tipo do parâmetro como number
            return 'R$ ' + value; // Adicionar R$ nas labels do eixo Y
          }
        }
      }
    }
  };
  
  

  if (loading) {
    return <p>Loading...</p>;
  }

  if (vehicleExpenses.length === 0) {
    return <p>No data available</p>;
  }

  const handleVehicleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = Number(e.target.value);
    setSelectedVehicle(value); // Atualiza o veículo selecionado
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
                {vehicleExpense.vehicle_name} {/* Nome do veículo */}
              </option>
            ))}
          </select>
        </div>
      </form>

      {/* Cartões de Despesas */}
      <div className="grid grid-cols-4 gap-4 mb-6 w-full max-w-screen-lg">
        <div className="bg-blue-400 text-white p-4 rounded shadow-lg">
          <p>Abastecimentos</p>
          <h2 className="text-2xl font-bold">R$ {totalRefuels.toFixed(2)}</h2>
        </div>
        <div className="bg-red-400 text-white p-4 rounded shadow-lg">
          <p>Manutenções</p>
          <h2 className="text-2xl font-bold">R$ {totalMaintenances.toFixed(2)}</h2>
        </div>
        <div className="bg-green-400 text-white p-4 rounded shadow-lg">
          <p>Peças trocadas</p>
          <h2 className="text-2xl font-bold">R$ {totalReplacements.toFixed(2)}</h2>
        </div>
        <div className="bg-yellow-400 text-white p-4 rounded shadow-lg">
          <p>Total</p>
          <h2 className="text-2xl font-bold">R$ {totalExpenses.toFixed(2)}</h2>
        </div>
      </div>

      {/* Gráfico */}
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-screen-lg">
        <h2 className="text-lg font-semibold mb-4">Gráfico (Últimos 6 meses):</h2>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default DespesasPage;




/*
"use client"

import React, { useEffect, useState } from 'react';
import { VehicleExpense } from '../services/vehicle/VehicleExpense';
import { getVehicleExpenses } from '../services/vehicle/vehicle';

const VehicleExpensesPage = () => {
    const [expenses, setExpenses] = useState<VehicleExpense[]>([]);
    
    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const data = await getVehicleExpenses();
                setExpenses(data);
            } catch (error) {
                console.error('Erro ao carregar despesas dos veículos:', error);
            }
        };

        fetchExpenses();
    }, []);

    return (
        <div>
            <h1>Despesas dos Veículos</h1>
            {expenses.map((expense) => (
                <div key={expense.vehicle_id}>
                    <h2>{expense.vehicle_name}</h2>
                    <p>Abastecimentos:</p>
                    {expense.refuels.map(refuel => (
                        <div key={refuel.refuel}>
                            <p>Data: {refuel.date}</p>
                            <p>Preço: {refuel.price}</p>
                        </div>
                    ))}
                    <p>Manutenções:</p>
                    {expense.maintenances.map(maintenance => (
                        <div key={maintenance.maintenance}>
                            <p>Data: {maintenance.date}</p>
                            <p>Preço: {maintenance.price}</p>
                        </div>
                    ))}
                    <p>Substituições de Peças:</p>
                    {expense.replacements.map(replacement => (
                        <div key={replacement.replacement}>
                            <p>Data: {replacement.date}</p>
                            <p>Preço: {replacement.price}</p>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default VehicleExpensesPage;
 */


/*
"use client"

import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { getVehicleExpenses, getVehicleExpensesById } from "../services/vehicle/VehicleExpense";
import { VehicleExpense } from "../services/vehicle/VehicleExpense";

const DespesasPageSimplificado = () => {
  const [vehicles, setVehicles] = useState<VehicleExpense[]>([]);
  const [selectedVehicleId, setSelectedVehicleId] = useState<number | null>(null);
  const [vehicleExpenses, setVehicleExpenses] = useState<VehicleExpense | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Buscar lista de despesas de veículos
  const fetchVehicles = async () => {
    setLoading(true);
    try {
      const data = await getVehicleExpenses();
      setVehicles(data);
    } catch (error) {
      setError('Erro ao buscar veículos');
    } finally {
      setLoading(false);
    }
  };

  // Buscar despesas do veículo selecionado por ID
  const fetchVehicleExpensesById = async (vehicleId: number) => {
    setLoading(true);
    try {
      const data = await getVehicleExpensesById(vehicleId);
      setVehicleExpenses(data);
    } catch (error) {
      setError('Erro ao buscar despesas do veículo');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  useEffect(() => {
    if (selectedVehicleId) {
      fetchVehicleExpensesById(selectedVehicleId);
    }
  }, [selectedVehicleId]);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  const chartData = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'], // Labels fixas para o exemplo
    datasets: [
      {
        label: 'Despesas de Abastecimento (R$)',
        data: vehicleExpenses?.refuels_data.map((r: any) => r.price) || [], // Dados de abastecimento
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
      },
      {
        label: 'Despesas de Manutenção (R$)',
        data: vehicleExpenses?.maintenances_data.map((m: any) => m.price) || [], // Dados de manutenção
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        tension: 0.4,
      }
    ]
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Despesas por Veículo</h1>

      
      <select
        value={selectedVehicleId || ""}
        onChange={(e) => setSelectedVehicleId(Number(e.target.value))}
        className="border p-2 rounded mb-6">
        <option value="">Selecione um veículo</option>
        {vehicles.map((vehicle) => (
          <option key={vehicle.vehicle_id} value={vehicle.vehicle_id}>
            {vehicle.vehicle_name}
          </option>
        ))}
      </select>

      
      {vehicleExpenses ? (
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-400 text-white p-4 rounded">
            <p>Total de Abastecimentos</p>
            <h2 className="text-2xl">R$ {vehicleExpenses.refuels_data.reduce((total: number, r: any) => total + r.price, 0).toFixed(2)}</h2>
          </div>
          <div className="bg-red-400 text-white p-4 rounded">
            <p>Total de Manutenções</p>
            <h2 className="text-2xl">R$ {vehicleExpenses.maintenances_data.reduce((total: number, m: any) => total + m.price, 0).toFixed(2)}</h2>
          </div>
          <div className="bg-green-400 text-white p-4 rounded">
            <p>Total Geral</p>
            <h2 className="text-2xl">R$ {(vehicleExpenses.refuels_data.reduce((total: number, r: any) => total + r.price, 0) + 
            vehicleExpenses.maintenances_data.reduce((total: number, m: any) => total + m.price, 0)).toFixed(2)}</h2>
          </div>
        </div>
      ) : (
        <p>Selecione um veículo para ver as despesas.</p>
      )}

      
      {vehicleExpenses && (
        <div className="bg-white p-6 rounded shadow-lg">
          <Line data={chartData} />
        </div>
      )}
    </div>
  );
};

export default DespesasPageSimplificado;
 */