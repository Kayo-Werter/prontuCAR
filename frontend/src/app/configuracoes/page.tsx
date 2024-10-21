import { FaBell } from "react-icons/fa6";

export default function Settings() {
  return (
    <div className="p-2 md:p-6 bg-blue-100 min-h-screen">
      <h1 className="text-2xl font-semibold mb-4">Configurações</h1>

      <div className="flex flex-col gap-6">
        
        {/* Configuração de Notificações */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-2">Notificações</h2>
          <div className="flex items-center justify-between mb-4">
            <label className="text-sm text-gray-600">Ativar notificações</label>
            <input 
              type="checkbox" 
              className="toggle-checkbox"
            />
          </div>
        </div>

        {/* Configuração de Lembretes de Manutenção */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-2">Lembretes de Manutenção</h2>
          <div className="flex items-center justify-between mb-4">
            <label className="text-sm text-gray-600">Lembrar sobre manutenção</label>
            <select className="border-gray-300 border rounded-md p-2">
              <option value="30 dias antes">30 dias antes</option>
              <option value="15 dias antes">15 dias antes</option>
              <option value="7 dias antes">7 dias antes</option>
            </select>
          </div>
        </div>

        {/* Configuração de Idioma */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-2">Idioma</h2>
          <div className="flex items-center justify-between mb-4">
            <label className="text-sm text-gray-600">Selecionar idioma</label>
            <select className="border-gray-300 border rounded-md p-2">
              <option value="Português">Português</option>
              <option value="Inglês">Inglês</option>
              <option value="Espanhol">Espanhol</option>
            </select>
          </div>
        </div>

        {/* Outros ajustes futuros */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-2">Tamanho da fonte</h2>
          <div className="flex items-center justify-between mb-4">
          <label className="text-sm text-gray-600">Selecionar tamanho</label>
            <select className="border-gray-300 border rounded-md p-2">
              <option value="50">50%</option>
              <option value="100">100%</option>
              <option value="150">150%</option>
              <option value="200">200%</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}