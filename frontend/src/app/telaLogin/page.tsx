/*import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import Image from 'next/image';
import { redirect } from 'next/navigation';

export default function Login() {
  
  async function handleLogin (formulario: FormData) {
    'use server'

    const response = await fetch("http://localhost:8000/api/v1/", {
      method: "POST",
      body: formulario,
    })

    if (response.ok){
      redirect("/home")//Redireciona para a página principal após o login
    }


  };

  return (
    <div className="h-screen flex flex-col md:flex-row relative">
      {/* Esquerda - Formulário de Login 
      <div className="w-full md:w-1/2 bg-gray-100 flex flex-col justify-center items-center p-6 md:p-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-black text-center">Bem vindo!</h1>
        <form className="w-full max-w-xs">
          <div className="mb-4">
            <Input
              label="Usuário"
              type="text"
              name="username"
              fullWidth
              className="mb-3"
            />
          </div>
          <div className="mb-6">
            <Input
              label="Senha"
              type="password"
              name="password"
              fullWidth
              className="mb-3"
            />
          </div>
          <Button
            className="w-full"
            type="submit"
            color="primary"
          >
            Entrar
          </Button>
          <div className="mt-4 text-center">
            <a href="https://www.google.com.br/?hl=pt-BR" className="text-blue-600">Esqueceu sua senha?</a>
          </div>
        </form>
      </div>
  
      {/* Direita - Imagem e Texto 
      <div className="w-full md:w-1/2 bg-blue-800 flex justify-center items-center relative p-4 md:p-0">
        <Image
            src="/prontuCar.png"
            alt="Login illustration"
            width={500}
            height={500}
            className="object-contain w-full h-auto md:max-w-[80%] md:h-auto"
          />
      </div>
    </div>
  );
  
};*/

"use client"

import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

export default function Login() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  async function handleSubmit(event: FormEvent<HTMLElement>) {
    event.preventDefault();

    const { username, password } = formData;

    // Envio da requisição para a rota de autenticação
    const response = await fetch("http://127.0.0.1:8000/api/v1/authentication/token/", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      const token = data.token; // Supondo que a resposta tenha a propriedade `token`

      // Armazenar o token no localStorage ou state, conforme sua necessidade
      localStorage.setItem('token', token);

      // Redirecionar para a página principal após o login
      router.push("/home");
  
    } else {
      // Tratar erros de autenticação
      console.error('Erro ao fazer login');
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="h-screen flex flex-col md:flex-row relative">
      {/* Esquerda - Formulário de Login */}
      <div className="w-full md:w-1/2 bg-gray-100 flex flex-col justify-center items-center p-6 md:p-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-black text-center">Bem vindo!</h1>
        <form className="w-full max-w-xs" onSubmit={handleSubmit}>
          <div className="mb-4">
            <Input
              label="Usuário"
              type="text"
              name="username"
              fullWidth
              className="mb-3"
              onChange={handleInputChange}
              value={formData.username}
            />
          </div>
          <div className="mb-6">
            <Input
              label="Senha"
              type="password"
              name="password"
              fullWidth
              className="mb-3"
              onChange={handleInputChange}
              value={formData.password}
            />
          </div>
          <Button className="w-full" type="submit" color="primary">
            Entrar
          </Button>
          <div className="mt-4 text-center">
            <a href="https://www.google.com.br/?hl=pt-BR" className="text-blue-600 mr-2">Esqueceu sua senha?</a>
            <a href="/telaCadastro" className="text-blue-600">Cadastre-se</a>
          </div>
        </form>
      </div>

      {/* Direita - Imagem e Texto */}
      <div className="w-full md:w-1/2 bg-blue-800 flex justify-center items-center relative p-4 md:p-0">
        <Image
          src="/prontuCar.png"
          alt="Login illustration"
          width={500}
          height={500}
          className="object-contain w-full h-auto md:max-w-[80%] md:h-auto"
        />
      </div>
    </div>
  );
}
