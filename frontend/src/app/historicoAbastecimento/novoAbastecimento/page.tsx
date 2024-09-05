
/*"use client"

import { useEffect, useState } from "react";
import axios from "axios";
import { newRefuel } from "../services/refuel/refuel";
import { Vehicle } from "../services/vehicle/vehicle";
import { VehicleType, vehicleTypes } from "../services/vehicle/vehicleType";

const NovoAbastecimento = () => {
    const [formData, setFormData] = useState({
        vehicle: "",
        price_gasoline: "",
        value_total: "",
        liters_gasoline: "",
        refuel_date: "",
    });
  
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  
    // Função para buscar veículos da API
    const fetchVehicles = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/v1/vehicle/');
            console.log('Dados dos veículos:', response.data); // Verifique o conteúdo da resposta
            setVehicles(response.data); // Ajuste conforme a estrutura da resposta da API
        } catch (error) {
            console.error('Erro ao buscar veículos:', error);
        }
    };

    useEffect(() => {
        fetchVehicles(); // Chama a função ao montar o componente
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      
      // Atualiza o estado do formulário
      setFormData(prevFormData => {
          const updatedData = { ...prevFormData, [name]: value };

          // Calcula os litros de gasolina se price_gasoline e value_total estão definidos
          if (name === 'price_gasoline' || name === 'value_total') {
              const price_gasoline = parseFloat(updatedData.price_gasoline);
              const value_total = parseFloat(updatedData.value_total);
              
              if (price_gasoline > 0 && value_total > 0) {
                  updatedData.liters_gasoline = (value_total / price_gasoline).toFixed(2);
              } else {
                  updatedData.liters_gasoline = "";
              }
          }

          return updatedData;
      });
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      const refuelData = {
          vehicle: formData.vehicle, // Passando o ID do veículo como string
          price_gasoline: parseFloat(formData.price_gasoline),
          value_total: parseFloat(formData.value_total),
          liters_gasoline: parseFloat(formData.liters_gasoline),
          refuel_date: formData.refuel_date || "", // Garante que refuel_date não seja undefined
      };

      try {
          await newRefuel(refuelData);
          alert("Abastecimento criado com sucesso!");
          setFormData({
            vehicle: "",
            price_gasoline: "",
            value_total: "",
            liters_gasoline: "", // Limpa o campo se necessário
            refuel_date: "",
          });// reseta formulario
      } catch (error) {
          console.error("Erro ao criar novo abastecimento:", error);
      }
    };

    return (
        <div className="p-6 grid justify-items-center">
            <h1 className="text-2xl font-bold mb-6">Novo Abastecimento</h1>
            <form onSubmit={handleSubmit} className="space-y-2 w-full max-w-md">
                <div>
                    <label className="block text-sm font-medium">Abastecimento do dia</label>
                    <input
                        type="date"
                        name="refuel_date"
                        value={formData.refuel_date}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div>
                  <label className="block text-sm font-medium">Tipo de Veículo</label>
                  <select
                    name="vehicle"
                    value={formData.vehicle}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                  >
                    <option value="">Selecione um tipo de veículo</option>
                    {vehicleTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                    <label className="block text-sm font-medium">Valor da Gasolina</label>
                    <input
                        type="number"
                        name="price_gasoline"
                        value={formData.price_gasoline}
                        onChange={handleChange}
                        placeholder="R$ 0,00"
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Valor Total</label>
                    <input
                        type="number"
                        name="value_total"
                        value={formData.value_total}
                        onChange={handleChange}
                        placeholder="R$ 0,00"
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Litros de Gasolina</label>
                    <input
                        type="number"
                        name="liters_gasoline"
                        value={formData.liters_gasoline}
                        readOnly
                        placeholder="Gasolina (L)"
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="text-center">
                    <button className="w-full bg-blue-600 text-white px-4 py-2 rounded" type="submit">
                        Salvar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default NovoAbastecimento;
*/


"use client"

import { useEffect, useState } from "react";
import axios from "axios";
import { newRefuel } from "../../services/refuel/refuel";
import { Vehicle } from "../../services/vehicle/vehicle";
import { VehicleType, vehicleTypes } from "../../services/vehicle/vehicleType";

const NovoAbastecimento = () => {
    const [formData, setFormData] = useState({
        vehicle: "",
        price_gasoline: "",
        value_total: "",
        liters_gasoline: "",
        refuel_date: "",
    });
  
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  
    // Função para buscar veículos da API
    const fetchVehicles = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/v1/vehicle/');
            console.log('Dados dos veículos:', response.data); // Verifique o conteúdo da resposta
            setVehicles(response.data); // Ajuste conforme a estrutura da resposta da API
        } catch (error) {
            console.error('Erro ao buscar veículos:', error);
        }
    };

    useEffect(() => {
        fetchVehicles(); // Chama a função ao montar o componente
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      
      // Atualiza o estado do formulário
      setFormData(prevFormData => {
          const updatedData = { ...prevFormData, [name]: value };

          // Calcula os litros de gasolina se price_gasoline e value_total estão definidos
          if (name === 'price_gasoline' || name === 'value_total') {
              const price_gasoline = parseFloat(updatedData.price_gasoline);
              const value_total = parseFloat(updatedData.value_total);
              
              if (price_gasoline > 0 && value_total > 0) {
                  updatedData.liters_gasoline = (value_total / price_gasoline).toFixed(2);
              } else {
                  updatedData.liters_gasoline = "";
              }
          }

          return updatedData;
      });
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      const refuelData = {
          vehicle: formData.vehicle, // Passando o ID do veículo como string
          price_gasoline: parseFloat(formData.price_gasoline),
          value_total: parseFloat(formData.value_total),
          liters_gasoline: parseFloat(formData.liters_gasoline),
          refuel_date: formData.refuel_date || "", // Garante que refuel_date não seja undefined
      };

      try {
          await newRefuel(refuelData);
          alert("Abastecimento criado com sucesso!");
          setFormData({
            vehicle: "",
            price_gasoline: "",
            value_total: "",
            liters_gasoline: "", // Limpa o campo se necessário
            refuel_date: "",
          });// reseta formulario
      } catch (error) {
          console.error("Erro ao criar novo abastecimento:", error);
      }
    };

    return (
        <div className="p-6 grid justify-items-center">
            <h1 className="text-2xl font-bold mb-6">Novo Abastecimento</h1>
            <form onSubmit={handleSubmit} className="space-y-2 w-full max-w-md">
                <div>
                    <label className="block text-sm font-medium">Abastecimento do dia</label>
                    <input
                        type="date"
                        name="refuel_date"
                        value={formData.refuel_date}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div>
                  <label className="block text-sm font-medium">Tipo de Veículo</label>
                  <select
                    name="vehicle"
                    value={formData.vehicle}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                  >
                    <option value="">Selecione um tipo de veículo</option>
                    {vehicles.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                    <label className="block text-sm font-medium">Valor da Gasolina</label>
                    <input
                        type="number"
                        name="price_gasoline"
                        value={formData.price_gasoline}
                        onChange={handleChange}
                        placeholder="R$ 0,00"
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Valor Total</label>
                    <input
                        type="number"
                        name="value_total"
                        value={formData.value_total}
                        onChange={handleChange}
                        placeholder="R$ 0,00"
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Litros de Gasolina</label>
                    <input
                        type="number"
                        name="liters_gasoline"
                        value={formData.liters_gasoline}
                        readOnly
                        placeholder="Gasolina (L)"
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="text-center">
                    <button className="w-full bg-blue-600 text-white px-4 py-2 rounded" type="submit">
                        Salvar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default NovoAbastecimento;
