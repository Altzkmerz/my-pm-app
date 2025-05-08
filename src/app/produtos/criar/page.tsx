'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/DashBoardLayout';

export default function CriarProduto() {
  const router = useRouter();
  const [form, setForm] = useState({
    nome: '',
    descricao: '',
    preco: '',
    quantidade: '',
  });

  const [erro, setErro] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');
    setMensagem('');

    const response = await fetch('/api/produtos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        preco: parseFloat(form.preco),
        quantidade: parseInt(form.quantidade),
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      setErro(errorData.error || 'Erro ao criar produto');
      return;
    }

    const data = await response.json();
    setMensagem(`Produto "${data.nome}" criado com sucesso!`);
    setForm({ nome: '', descricao: '', preco: '', quantidade: '' });
    router.push('/produtos');
  };

  return (
    <DashboardLayout>
    <div className="p-6 content-center">
      <h1 className="text-3xl font-bold mb-6">Criar Novo Produto</h1>

      {erro && <p className="text-red-600 mb-4">{erro}</p>}
      {mensagem && <p className="text-green-600 mb-4">{mensagem}</p>}

      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
        <div>
          <label className="block text-lg">Nome:</label>
          <input
            type="text"
            name="nome"
            value={form.nome}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label className="block text-lg">Descrição:</label>
          <input
            type="text"
            name="descricao"
            value={form.descricao}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label className="block text-lg">Preço:</label>
          <input
            type="number"
            step="0.01"
            name="preco"
            value={form.preco}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label className="block text-lg">Quantidade:</label>
          <input
            type="number"
            name="quantidade"
            value={form.quantidade}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition"
        >
          Criar Produto
        </button>
      </form>
    </div>
    </DashboardLayout>
  );
}
