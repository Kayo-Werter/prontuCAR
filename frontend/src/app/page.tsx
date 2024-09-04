/*import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Get started by editing&nbsp;
          <code className="font-mono font-bold">src/app/page.tsx</code>
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className="relative z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Docs{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Find in-depth information about Next.js features and API.
          </p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Learn{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Learn about Next.js in an interactive course with&nbsp;quizzes!
          </p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Templates{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Explore starter templates for Next.js.
          </p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Deploy{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-balance text-sm opacity-50">
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>
    </main>
  );
}
*/



/* para implementar mascara: npm install react-input-mask */
"use client";

import React, {useEffect, useState } from "react";
import { createMaintenance } from "@/app/services/maintenance/maintenance";
import { Vehicle } from "./services/vehicle/vehicle";
//import { fetchVehicles } from "@/app/services/maintenance/maintenance";
import axios from "axios";
//import InputMask from 'react-input-mask';
import InputMask from "react-input-mask";




const NovaManutencao = () => {
  const [formData, setFormData] = useState({
    vehicle: "",
    value: "",
    description: "",
    local: "",
    maintenance_date: "",
  });

  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  // criar o get lá no meu "maintenance.ts" e chamar a função aqui
  /*useEffect(() => {
    const loadVehicles = async () => {
      try {
        const vehicles = await fetchVehicles();
        setVehicles(vehicles);
      } catch (error) {
        console.error('Erro ao buscar veículos:', error);
      }
    };

    loadVehicles(); // Chama a função ao montar o componente
  }, []);*/
  
    // Função para buscar veículos da API
    const fetchVehicles = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/v1/vehicle/');
            console.log('Dados dos veículos:', response.data); // Verifique o conteúdo da resposta
            setVehicles(response.data); // Ajuste conforme a estrutura da resposta da API
        } catch (error) {
            console.error('Erro ao buscar veículos:', error);
        }
    };

    useEffect(() => {
        fetchVehicles(); // Chama a função ao montar o componente
    }, []);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();


    // Converta a data para um objeto Date
    const maintenanceData = {
      ...formData,
      value: parseFloat(formData.value), // Caso o valor seja uma string, converta para número
      maintenance_date: new Date(formData.maintenance_date), // Converte string para Date
    };


    try {
      await createMaintenance(maintenanceData);
      alert("Manutenção criada com sucesso!");
    } catch (error) {
      console.error("Erro ao criar manutenção:", error);
    }
  };


  return (
    <div className="p-6 grid justify-items-center">
      <h1 className="text-2xl font-bold mb-6">Nova Manutenção</h1>
      <form onSubmit={handleSubmit} className="space-y-2 w-full max-w-md">
        <div>
          <label className="block text-sm font-medium">Data da manutenção:</label>
          <input
            type="date"
            name="maintenance_date"
            value={formData.maintenance_date}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
            <label className="block text-sm font-medium">Veículo</label>
            <select
                name="vehicle"
                value={formData.vehicle}
                onChange={handleChange}
                className="w-full p-2 border rounded"
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
          <label className="block text-sm font-medium">Observações:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Digite aqui:"
            className="w-full p-2 border rounded"
            rows={4}
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium">Local:</label>
          <input
            type="text"
            name="local"
            value={formData.local}
            onChange={handleChange}
            placeholder="Digite aqui:"
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Valor:</label>
          <InputMask
            mask="R$ 99,999.99"
            value={formData.value}
            onChange={handleChange}
            name="value"
            placeholder="R$ 0,00"
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


export default NovaManutencao;

