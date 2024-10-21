"use client";

import Image from 'next/image';
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BsCarFrontFill, BsCoin, BsFolder, BsFuelPump, BsGear } from "react-icons/bs";
import { FaClipboardList } from "react-icons/fa";
import { FiHome, FiMenu, FiX } from "react-icons/fi";
import { VscTools } from "react-icons/vsc";
import { SidebarItem } from "./SidebarItem";

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleLogoClick = () => {
    router.push("/home");
  };

  return (
    <aside className={`fixed top-0 left-0 h-full flex flex-col p-4 bg-gray-50 transition-transform duration-1000 ease-in-out ${isOpen ? "w-64" : "w-16"} z-50`}>
      <div className="flex items-center justify-between mb-10">
        {/* Logotipo */}
        <div onClick={handleLogoClick} className={`cursor-pointer ${isOpen ? "block" : "hidden"}`}>
          <Image
            src="/logo.png"
            alt="Logo"
            width={40}
            height={40}
            priority // Carregar a imagem com prioridade
          />
        </div>
        {/* Botão do Menu Hambúrguer */}
        <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>
      <div className="flex flex-col gap-4 transition-all duration-300 ease-in-out">
        {/* Sidebar Items */}
        <SidebarItem icon={<FiHome />} label={isOpen ? "Home" : ""} path="/home" />
        <SidebarItem icon={<BsCarFrontFill />} label={isOpen ? "Veículos Cadastrados" : ""} path="/veiculos" />
        <SidebarItem icon={<FaClipboardList />} label={isOpen ? "Histórico de Manutenções" : ""} path="/historicoManutencao" />
        <SidebarItem icon={<BsFuelPump />} label={isOpen ? "Combustível" : ""} path="/historicoAbastecimento" />
        <SidebarItem icon={<VscTools />} label={isOpen ? "Peças Trocadas" : ""} path="/pecas" />
        <SidebarItem icon={<BsCoin />} label={isOpen ? "Despesas" : ""} path="/despesas" />
        <SidebarItem icon={<BsFolder />} label={isOpen ? "Documentos" : ""} path="/documentos" />
        <SidebarItem icon={<BsGear />} label={isOpen ? "Configurações" : ""} path="/configuracoes" />
      </div>
      <div className={`mt-auto flex items-center p-4 ${isOpen ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}>
        {isOpen && (
          <>
            <Image
              src="/perfil.jpg"
              alt="John Doe"
              width={40}
              height={40}
              className="rounded-full object-cover mr-3"
              priority // Carregar a imagem com prioridade
            />
            <div>
              <p className="text-sm font-medium">Usuário</p>
              <p className="text-xs text-gray-500">israel</p>
            </div>
          </>
        )}
      </div>
    </aside>
  );
};
