"use client";

import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { vehicleTypes } from "../../services/vehicle/vehicleType";
//import { getDocuments, Document } from '../../services/file/document'; // Importar as funções de documento


// Defina uma interface para os dados do formulário
interface FormData {
    automobile: string;
    name: string;
    plate: string;
    file: File | null; // Altere para aceitar arquivos
    fileUrl: string; // Para armazenar a URL do arquivo existente
    buy_day: string;
}

const EditarVeiculo = () => {
    const params = useParams();
    const id = params?.id as string | undefined;
    const router = useRouter();
    //const [documents, setDocuments] = useState<Document[]>([]); // Novo estado para armazenar os documentos


    const [formData, setFormData] = useState<FormData>({
        automobile: '',
        name: '',
        plate: '',
        file: null,
        fileUrl: '',
        buy_day: '',
    });

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:8000/api/v1/vehicle/${id}/`)
                .then((response) => {
                    setFormData({
                        ...response.data,
                        file: null,
                        fileUrl: response.data.file || '',
                    });
                })
                .catch((error) => {
                    console.error('Erro ao obter dados de veículo:', error);
                });
        }
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (name === "file") {
            const selectedFile = (e.target as HTMLInputElement).files?.[0] || null;
            setFormData({
                ...formData,
                file: selectedFile,
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append('automobile', formData.automobile);
        formDataToSend.append('name', formData.name);
        formDataToSend.append('plate', formData.plate);
        formDataToSend.append('buy_day', formData.buy_day);

        if (formData.file) {
            formDataToSend.append('file', formData.file);
        }

        if (id) {
            axios.put(`http://localhost:8000/api/v1/vehicle/${id}/`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then(() => {
                alert('Veículo atualizado com sucesso!');
                router.push('/veiculos');
            })
            .catch((error) => {
                console.error('Erro ao atualizar veículo:', error);
            });
        }
    };

    // Função para extrair o nome do arquivo da URL
    const getFileNameFromUrl = (url: string | undefined): string => {
        return url ? url.split('/').pop() || '' : ''; // Retorna uma string vazia se url for undefined
    };

    return (
        <div className="p-6 grid justify-items-center">
            <h1 className="text-2xl font-bold mb-6">Editar Veículo</h1>
            <form onSubmit={handleSubmit} className="space-y-2 w-full max-w-md">
                <div>
                    <label htmlFor="automobile" className="block text-sm font-medium">Automóvel:</label>
                    <select
                        name="automobile"
                        value={formData.automobile}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    >
                        <option value="">Selecione um tipo de veículo</option>
                        {vehicleTypes.map((type) => (
                            <option key={type.value} value={type.value}>
                                {type.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="buy_day" className="block text-sm font-medium">Data de Compra:</label>
                    <input
                        type="date"
                        id="buy_day"
                        name="buy_day"
                        value={formData.buy_day}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="file" className="block text-sm font-medium">Documento:</label>
                    <input
                        type="file"
                        id="file"
                        name="file"
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                    {formData.fileUrl && (
                        <p className="block text-sm font-medium">Documento atual:
                            <a
                                href={formData.fileUrl}
                                download={getFileNameFromUrl(formData.fileUrl)}  // Força o download do arquivo
                                className="text-blue-600 underline"
                                onClick={(e) => {
                                    e.preventDefault();
                                    const link = document.createElement('a');
                                    link.href = formData.fileUrl;
                                    link.setAttribute('download', getFileNameFromUrl(formData.fileUrl)); // Força o download
                                    document.body.appendChild(link);
                                    link.click();
                                    document.body.removeChild(link);
                                }}
                            >
                                {getFileNameFromUrl(formData.fileUrl)}
                            </a>
                        </p>
                    )}
                </div>

                <div>
                    <label htmlFor="plate" className="block text-sm font-medium">Placa:</label>
                    <input
                        type="text"
                        id="plate"
                        name="plate"
                        value={formData.plate}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="name" className="block text-sm font-medium">Modelo:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>

                <div className="text-center">
                    <button className="w-full bg-blue-600 text-white px-4 py-2 rounded mt-4" type="submit">
                        Salvar Alterações
                    </button>
                    <button
                        type="button" className="mt-4 w-full border-4 border-blue-600 text-blue-600 px-4 py-2 rounded" onClick={() => router.push('/veiculos')}>
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditarVeiculo;
