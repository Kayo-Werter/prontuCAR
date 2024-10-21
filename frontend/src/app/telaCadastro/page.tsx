/* Tela de Cadastro */
/*import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import Image from 'next/image';
import { redirect } from 'next/navigation';

export default function Cadastro() {

  async function handleCadastro(formulario: FormData) {
    'use server';

    const response = await fetch("http://127.0.0.1:8000/api/cadastro/", {
      method: "POST",
      body: formulario,
    });

    if (response.ok) {
      redirect("/login"); // Redireciona para a página de login após o cadastro
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Coluna Esquerda - Imagens *//*
      <div className="w-1/2 bg-white flex justify-center items-center p-8 relative">
        {/* Retângulo 1 *//*
        <div className="absolute top-0 left-20 w-full h-full">
          <Image
            src="/retanguloInclinado.png" // primeira imagem do retângulo
            alt="Retângulo 1"
            width={300}
            height={400}
            objectFit="contain"
            className="z-10" // Z-index para garantir que este retângulo fique atrás do carro, mas à frente do outro retângulo
          />
        </div>

        {/* Retângulo 2 *//*
        <div className="absolute top-0 left-40 w-full h-full">
          <Image
            src="/retangulo.png" // segunda imagem do retângulo
            alt="Retângulo 2"
            width={320}
            height={400}
            objectFit="contain"
            className="z-0" // Z-index para garantir que este retângulo fique atrás de todos
          />
        </div>

        {/* Imagem Principal *//*
        <div className="relative z-20">
          <Image
            src="/prontuCar.png" // imagem principal do carro
            alt="Imagem de um carro e um bloco de notas"
            width={500}
            height={500}
            className="object-contain"
          />
        </div>
      </div>

      {/* Coluna Direita - Formulário de Cadastro *//*
      <div className="w-1/2 flex flex-col justify-center items-center p-8 bg-white">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Cadastre-se</h1>
        <form className="w-full max-w-sm">
          <div className="mb-4">
            <Input
              label="Nome"
              type="text"
              name="nome"
              fullWidth
              className="mb-3"
            />
          </div>
          <div className="mb-4">
            <Input
              label="Usuário"
              type="text"
              name="username"
              fullWidth
              className="mb-3"
            />
          </div>
          <div className="mb-4">
            <Input
              label="E-mail"
              type="email"
              name="email"
              fullWidth
              className="mb-3"
            />
          </div>
          <div className="mb-4">
            <Input
              label="Senha"
              type="password"
              name="password"
              fullWidth
              className="mb-3"
            />
          </div>
          <div className="mb-6">
            <Input
              label="Confirmar Senha"
              type="password"
              name="confirm-password"
              fullWidth
              className="mb-3"
            />
          </div>
          <Button
            className="w-full"
            type="submit"
            color="primary"
          >
            Registrar
          </Button>
          <div className="mt-4 text-center">
            <a href="/login" className="text-blue-600">Já possui uma conta? Login</a>
          </div>
        </form>
      </div>
    </div>
  );
};*/

"use client";

import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import Image from 'next/image';
import { useState, FormEvent } from 'react';
import { redirect } from 'next/navigation';
import axios from 'axios'; // Adicione esta importação
// Função para obter o token de autenticação armazenado no localStorage
export const getToken = () => {
  return localStorage.getItem('authToken');
};
export default function Cadastro() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    cep: "",
    number: "",
    street: "",
    neighborhood: "",
    city: "",
    state: ""
  });
  // Função para lidar com mudanças nos campos de entrada
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Função para buscar dados do endereço com base no CEP
  const fetchAddressData = async (cep: string) => {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      if (response.data && !response.data.erro) {
        const { logradouro, bairro, localidade, uf } = response.data;
        setFormData((prevData) => ({
          ...prevData,
          street: logradouro,
          neighborhood: bairro,
          city: localidade,
          state: uf
        }));
      } else {
        console.error("CEP não encontrado.");
      }
    } catch (error) {
      console.error("Erro ao buscar dados do endereço", error);
    }
  };

  async function handleCadastro(event: FormEvent) {
    event.preventDefault();

    const { firstName, lastName, username, email, phone, password, cep, number } = formData;

    const userPayload = {
      first_name: firstName,
      last_name: lastName,
      username: username,
      email: email,
      phone: phone,
      password: password,
      address: {
        cep: cep,
        number: number
      }
    };
    // Envia a requisição POST para criar um novo usuário
    const response = await fetch("http://127.0.0.1:8000/api/v1/users/", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${localStorage.getItem('token')}`
       },
      body: JSON.stringify(userPayload),// Converte o payload em JSON
    });

    if (response.ok) {
      redirect("/telaLogin");
    } else {
      console.error("Falha ao registrar usuário");
    }
  }

  // Função para lidar com a alteração do CEP e buscar dados do endereço
  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData({
      ...formData,
      cep: value,
    });
    if (value.length === 8) { // Verifica se o CEP tem 8 dígitos
      await fetchAddressData(value);//Chama a função para buscar dados do endereço
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Coluna Esquerda - Imagens */}
      <div className="w-full md:w-1/2 bg-white flex justify-center items-center p-8 relative">
        {/* Retângulo 1 */}
        <div className="absolute top-0 left-10 md:left-20 w-full h-full">
          <Image
            src="/retanguloInclinado.png"
            alt="Retângulo 1"
            width={300}
            height={400}
            objectFit="contain"
            className="z-10"
          />
        </div>

        {/* Retângulo 2 */}
        <div className="absolute top-0 left-20 md:left-40 w-full h-full">
          <Image
            src="/retangulo.png"
            alt="Retângulo 2"
            width={320}
            height={400}
            objectFit="contain"
            className="z-0"
          />
        </div>

        {/* Imagem Principal */}
        <div className="relative z-20">
          <Image
            src="/prontuCar.png"
            alt="Imagem de um carro e um bloco de notas"
            width={500}
            height={500}
            className="object-contain"
          />
        </div>
      </div>

      {/* Coluna Direita - Formulário de Cadastro */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 bg-white">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Cadastre-se</h1>
        <form className="w-full max-w-xs" onSubmit={handleCadastro}>
          <div className="mb-4">
            <Input
              label="Nome"
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              fullWidth
              className="mb-3"
            />
          </div>
          <div className="mb-4">
            <Input
              label="Sobrenome"
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              fullWidth
              className="mb-3"
            />
          </div>
          <div className="mb-4">
            <Input
              label="Usuário"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              fullWidth
              className="mb-3"
            />
          </div>
          <div className="mb-4">
            <Input
              label="E-mail"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              fullWidth
              className="mb-3"
            />
          </div>
          <div className="mb-4">
            <Input
              label="Telefone"
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              fullWidth
              className="mb-3"
            />
          </div>
          <div className="mb-4">
            <Input
              label="Senha"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              fullWidth
              className="mb-3"
            />
          </div>
          <div className="mb-4">
            <Input
              label="CEP"
              type="text"
              name="cep"
              value={formData.cep}
              onChange={handleCepChange} // Muda para usar a nova função
              fullWidth
              className="mb-3"
            />
          </div>
          <div className="mb-4">
            <Input
              label="Número do Endereço"
              type="text"
              name="number"
              value={formData.number}
              onChange={handleInputChange}
              fullWidth
              className="mb-3"
            />
          </div>
          {/* Campos ocultos que serão preenchidos automaticamente */}
          <input type="hidden" name="street" value={formData.street} />
          <input type="hidden" name="neighborhood" value={formData.neighborhood} />
          <input type="hidden" name="city" value={formData.city} />
          <input type="hidden" name="state" value={formData.state} />
          
          <Button className="w-full" type="submit" color="primary">
            Registrar
          </Button>
          <div className="mt-4 text-center">
            <a href="/telaLogin" className="text-blue-600">Já possui uma conta? Login</a>
          </div>
        </form>
      </div>
    </div>
  );
}
