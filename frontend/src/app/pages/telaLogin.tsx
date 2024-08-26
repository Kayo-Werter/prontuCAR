import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import Image from 'next/image';
import { redirect } from 'next/navigation';




export default function Login() {
  
  async function handleLogin (formulario: FormData) {
    'use server'

    const response = await fetch("http://127.0.0.1:8000/api/token/", {
      method: "POST",
      body: formulario,
    })

    if (response.ok){
      redirect("/filmes")//Redireciona para a página principal após o login
    }


  };

  return (
    <div className="h-screen flex flex-col md:flex-row relative">
      {/* Esquerda - Formulário de Login */}
      <div className="w-full md:w-1/2 bg-gray-100 flex flex-col justify-center items-center p-6 md:p-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-black">Bem vindo!</h1>
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
  
      {/* Direita - Imagem e Texto */}
      <div className="w-full md:w-1/2 bg-blue-800 flex justify-center items-center relative p-4 md:p-0">
        <Image
            src="/prontuCar.png"
            alt="Login illustration"
            width={500}
            height={500}
            className="object-contain absolute md:-left-40"
          />
      </div>
    </div>
  );
  
};
