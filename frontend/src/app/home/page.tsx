
import { FaBell } from "react-icons/fa6";
export default function Dashboard() {
  return (
    <div className="p-2 md:p-6 bg-blue-100 min-h-screen">
      
      <h1 className="text-2xl font-semibold mb-4">Olá, Israel Ferreira!</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div className="bg-white shadow-md rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold">Última Manutenção</h2>
            <span className="text-sm text-gray-500">02/08/2024</span>
          </div>
          <p className="text-gray-600 text-sm">
            Observação: Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          </p>
          <div className="flex justify-between items-center mt-4">
            <span className="text-sm text-gray-500">Local: Oficina Turbo</span>
            <span className="text-sm text-gray-500">Valor: R$ 100,00</span>
          </div>
        </div>

        
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-2">Notificações</h2>
          <div className="flex items-center mb-2">
            <span className="text-yellow-500 mr-2"><FaBell /></span>
            <span className="text-sm text-gray-600">Próxima troca de óleo: 25/08/2024</span>
          </div>
          <div className="flex items-center">
            <span className="text-red-500 mr-2"><FaBell /> </span>
            <span className="text-sm text-gray-600">Documento(s) pendentes!</span>
          </div>
        </div>

        
        <div className="bg-white shadow-md rounded-lg p-4 flex items-center">
          <div>
            <h2 className="text-lg font-semibold mb-2">Dica</h2>
            <p className="text-sm text-gray-600">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab atque quam saepe cum ut vitae ullam eveniet inventore temporibus aliquam. Molestiae recusandae pariatur cumque voluptate deleniti tenetur reprehenderit iusto aliquam.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
