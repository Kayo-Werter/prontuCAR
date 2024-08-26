/* Tela de Cadastro */
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
    <div className="min-h-screen flex">
      {/* Coluna Esquerda - Imagens */}
      <div className="w-1/2 bg-white flex justify-center items-center p-8 relative">
        {/* Retângulo 1 */}
        <div className="absolute top-0 left-20 w-full h-full">
          <Image
            src="/carro.png" // primeira imagem do retângulo
            alt="Retângulo 1"
            width={1000}
            height={1000}
            objectFit="contain"
            className="z-10" // Z-index para garantir que este retângulo fique atrás do carro, mas à frente do outro retângulo
          />
        </div>
      </div>

      {/* Coluna Direita - Formulário de Cadastro */}
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
};
