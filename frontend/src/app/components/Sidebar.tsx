/* instalar a biblioteca de icons: npm install react-icons */
"use client";

import React, { useState } from "react";
import { SidebarItem } from "./SidebarItem";
import { FiMenu, FiX, FiHome } from "react-icons/fi";
import Image from 'next/image';
import { BsCarFrontFill, BsFuelPump, BsCoin, BsFolder, BsGear } from "react-icons/bs";
import { FaClipboardList } from "react-icons/fa";
import { VscTools } from "react-icons/vsc";
import { GiMechanicGarage } from "react-icons/gi";



export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    /*className={`flex flex-col h-screen p-4 bg-gray-50 transition-transform duration-300 ${isOpen ? "w-64" : "w-16"} md:relative md:translate-x-0`}>*/
    <aside className={`fixed top-0 left-0 h-full flex flex-col p-4 bg-gray-50 transition-transform duration-300 ${isOpen ? "w-64" : "w-16"} z-50`}>
  
      <div className="flex items-center justify-between mb-10">
        
        {/* Logotipo */}
        {isOpen && (
          <Image src="/logo.png" alt="Logo" width={40} height={40} />
        )}
        {/* Botão do Menu Hambúrguer */}
        <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
        
      </div>
      <div className="flex flex-col gap-4">
        <SidebarItem icon={<FiHome />} label={isOpen ? "Home" : ""} path="/home" />
        <SidebarItem icon={<BsCarFrontFill />} label={isOpen ? "Veículos Cadastrados" : ""} path="/cadastrarVeiculo" />
        <SidebarItem icon={<FaClipboardList />} label={isOpen ? "Histórico de Manutenções" : ""} path="/novaManutencao" />
        <SidebarItem icon={<BsFuelPump />} label={isOpen ? "Combustível" : ""} path="/novoAbastecimento" />
        <SidebarItem icon={<VscTools />} label={isOpen ? "Peças Trocadas" : ""} path="/novaManutencao" />
        <SidebarItem icon={<BsCoin />} label={isOpen ? "Despesas" : ""} path="/despesas" />
        <SidebarItem icon={<BsFolder />} label={isOpen ? "Documentos" : ""} path="/telaLogin" />
        <SidebarItem icon={<BsGear />} label={isOpen ? "Configurações" : ""} path="/configuracoes" />
      </div>
      <div className="mt-auto flex items-center p-4">
        {isOpen && (
          <>
            <Image
                src="/perfil.jpg"
                alt="John Doe"
                width={40} // Defina a largura
                height={40} // Defina a altura
                className="rounded-full object-cover mr-3"
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
