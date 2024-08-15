import { Button } from '@nextui-org/button';
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
    <div className="min-h-screen flex flex-col md:flex-row relative">
      {/* Esquerda - Formulário de Cadastro */}
      <div className="w-full md:w-1/2 bg-gray-100 flex flex-col justify-center items-center p-4 md:p-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-black">Cadastro</h1>
        <form className="w-full max-w-xs">
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
              label="E-mail"
              type="email"
              name="email"
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
            Cadastrar
          </Button>
          <div className="mt-4 text-center">
            <a href="/login" className="text-blue-600">Já tem uma conta? Faça login</a>
          </div>
        </form>
      </div>
    </div>
  );
};
