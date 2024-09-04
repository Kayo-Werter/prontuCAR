/* tela de novo veiculo */

/*"use client";

import React, { useState } from "react";
import { createVehicle } from "@/app/services/vehicle/vehicle";

const NovoVeiculo = () => {
  const [formData, setFormData] = useState({
    automobile: "",
    name: "",
    plate: "",
    document: "",
    buy_day: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const vehicleData = {
      ...formData,
      document: formData.document ? Number(formData.document) : undefined,
      buy_day: formData.buy_day || undefined,
    };

    try {
      await createVehicle(vehicleData);
      alert("Veículo criado com sucesso!");
    } catch (error) {
      console.error("Erro ao criar veículo:", error);
    }
  };

  return (
    <div className="p-6 grid justify-items-center">
      <h1 className="text-2xl font-bold mb-6">Novo Veículo</h1>
      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
        <div>
          <label className="block text-sm font-medium">Automóvel:</label>
          <select
            name="automobile"
            value={formData.automobile}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Selecione Veículo</option>
            <option value="Moto">Moto</option>
            <option value="Carro">Carro</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Data de Compra:</label>
          <input
            type="date"
            name="buy_day"
            value={formData.buy_day}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Documento:</label>
          <input
            type="text"
            name="document"
            value={formData.document}
            onChange={handleChange}
            placeholder="Insira Documento"
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Placa de Veículo:</label>
          <input
            type="text"
            name="plate"
            value={formData.plate}
            onChange={handleChange}
            placeholder="Lorem Ipsum"
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

export default NovoVeiculo;*/

"use client"
 
import { useState } from "react";
import { Vehicle, createVehicle } from "../services/vehicle/vehicle";
import { vehicleTypes } from "../services/vehicle/vehicleType";
import InputMask from "react-input-mask";

const AddNewVehicle = () => {
    const [formData, setFormData] = useState({
        automobile: "",
        name: "",
        plate: "",
        document: "",
        buy_day: "",
    });
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        const vehicleData: Vehicle = {
            automobile: formData.automobile,
            name: formData.name,
            plate: formData.plate || undefined,
            document: formData.document ? parseInt(formData.document) : undefined,
            buy_day: formData.buy_day || undefined,
        };

        try {
            await createVehicle(vehicleData);
            alert("Veículo criado com sucesso!");
            setFormData({
                automobile: "",
                name: "",
                plate: "",
                document: "",
                buy_day: "",
            });
        } catch (error) {
            console.error("Erro ao criar novo veículo:", error);
            setError("Falha ao criar o veículo. Tente novamente.");
        }
    };

    return (
        <div className="p-6 grid justify-items-center">
            <h1 className="text-2xl font-bold mb-6">Cadastrar Veículo</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-2 w-full max-w-md">
                {/* Campos do formulário */}
                <div>
                    <label className="block text-sm font-medium">Data da Compra</label>
                    <input
                        type="date"
                        name="buy_day"
                        value={formData.buy_day}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Tipo de Veículo</label>
                    <select
                        name="automobile"
                        value={formData.automobile}
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
                    <label className="block text-sm font-medium">Modelo do Veículo</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Digite o modelo do veículo"
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Placa do Veículo</label>
                    <InputMask
                        mask="***-****"
                        type="text"
                        name="plate"
                        value={formData.plate}
                        onChange={handleChange}
                        placeholder="Digite a placa do veículo"
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium" htmlFor="document">Documento</label>
                    <input
                      type="text"
                      name="document"
                      value={formData.document}
                      onChange={handleChange}
                      placeholder="Insira Documento"
                      className="w-full p-2 border rounded"
                    />
                </div>
                <div className="text-center">
                    <button className="w-full bg-blue-600 text-white px-4 py-2 rounded mt-4" type="submit">
                        Salvar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddNewVehicle;
