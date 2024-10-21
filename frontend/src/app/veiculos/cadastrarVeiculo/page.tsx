

/*"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import InputMask from "react-input-mask";
import { createVehicle } from "../../services/vehicle/vehicle";
import { vehicleTypes } from "../../services/vehicle/vehicleType";



const AddNewVehicle = () => {
    const [formData, setFormData] = useState<{
        automobile: string;
        name: string;
        plate: string;
        file: File | null; // Alterado para File | null para lidar com o arquivo
        buy_day: string;
    }>({
        automobile: "",
        name: "",
        plate: "",
        file: null, // Inicializa como null
        buy_day: "",
    });
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (name === "file") {
            // Lidar com a mudança do arquivo
            const target = e.target as HTMLInputElement;
            const selectedFile = target.files?.[0] || null; // Pega o arquivo se existir
            setFormData((prevFormData) => ({
                ...prevFormData,
                file: selectedFile,
            }));
        } else {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: value,
            }));
        }
    };
    

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        const formDataToSend = new FormData(); // Usar FormData para enviar o arquivo
        formDataToSend.append("automobile", formData.automobile);
        formDataToSend.append("name", formData.name);
        if (formData.plate) formDataToSend.append("plate", formData.plate);
        if (formData.file) formDataToSend.append("file", formData.file); // Anexa o arquivo
        formDataToSend.append("buy_day", formData.buy_day);

        try {
            await createVehicle(formDataToSend); // Envia o FormData
            alert("Veículo criado com sucesso!");
            setFormData({
                automobile: "",
                name: "",
                plate: "",
                file: null, // Reseta para null após a submissão
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
                {/* Campos do formulário *//*
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
                    <label className="block text-sm font-medium" htmlFor="file">Documento</label>
                    <input
                        type="file"
                        name="file"
                        id="file"
                        onChange={handleChange}
                        className="hidden"
                    />
                    <button
                        type="button"
                        onClick={() => document.getElementById('file')?.click()}
                        className="w-full p-2 border rounded bg-blue-500 text-white hover:bg-blue-600"
                    >
                        Escolher Arquivo
                    </button>
                    {formData.file && (
                        <span className="ml-2">{formData.file.name}</span>
                    )}
                </div>

                <div className="text-center">
                    <button className="w-full bg-blue-600 text-white px-4 py-2 rounded mt-4" type="submit" onClick={() => router.push('/veiculos')}>
                        Salvar
                    </button>
                    <button
                        type="button" className="mt-4 w-full border-4 border-blue-600 text-blue-600 px-4 py-2 rounded" onClick={() => router.push('/veiculos')}>
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddNewVehicle;*/



"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import InputMask from "react-input-mask";
import { createVehicle } from "../../services/vehicle/vehicle";
import { vehicleTypes } from "../../services/vehicle/vehicleType";



const AddNewVehicle = () => {
  const [formData, setFormData] = useState<{
      automobile: string;
      name: string;
      plate: string;
      file: File | null; // Alterado para File | null para lidar com o arquivo
      buy_day: string;
  }>({
      automobile: "",
      name: "",
      plate: "",
      file: null, // Inicializa como null
      buy_day: "",
  });
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;

      if (name === "file") {
          // Lidar com a mudança do arquivo
          const target = e.target as HTMLInputElement;
          const selectedFile = target.files?.[0] || null; // Pega o arquivo se existir
          setFormData((prevFormData) => ({
              ...prevFormData,
              file: selectedFile,
          }));
      } else {
          setFormData((prevFormData) => ({
              ...prevFormData,
              [name]: value,
          }));
      }
  };
  

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setError(null);

      const formDataToSend = new FormData(); // Usar FormData para enviar o arquivo
      formDataToSend.append("automobile", formData.automobile);
      formDataToSend.append("name", formData.name);
      if (formData.plate) formDataToSend.append("plate", formData.plate);
      if (formData.file) formDataToSend.append("file", formData.file); // Anexa o arquivo
      formDataToSend.append("buy_day", formData.buy_day);

      try {
          await createVehicle(formDataToSend); // Envia o FormData
          alert("Veículo criado com sucesso!");
          setFormData({
              automobile: "",
              name: "",
              plate: "",
              file: null, // Reseta para null após a submissão
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
                  <label className="block text-sm font-medium" htmlFor="file">Documento</label>
                  <input
                      type="file"
                      name="file"
                      id="file"
                      onChange={handleChange}
                      className="hidden"
                  />
                  <button
                      type="button"
                      onClick={() => document.getElementById('file')?.click()}
                      className="w-full p-2 border rounded bg-blue-500 text-white hover:bg-blue-600"
                  >
                      Escolher Arquivo
                  </button>
                  {formData.file && (
                      <span className="ml-2">{formData.file.name}</span>
                  )}
              </div>

              <div className="text-center">
                  <button className="w-full bg-blue-600 text-white px-4 py-2 rounded mt-4" type="submit" onClick={() => router.push('/veiculos')}>
                      Salvar
                  </button>
                  <button
                      type="button" className="mt-4 w-full border-4 border-blue-600 text-blue-600 px-4 py-2 rounded" onClick={() => router.push('/veiculos')}>
                      Cancelar
                  </button>
              </div>
          </form>
      </div>
  );
};

export default AddNewVehicle;

