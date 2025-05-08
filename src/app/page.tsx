'use client';

import DashboardLayout from '@/components/DashBoardLayout';
import { useEffect, useState } from 'react';

export default function Home() {
  const [produtos, setProdutos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [prodRes, userRes] = await Promise.all([
        fetch('/api/produtos'),
        fetch('/api/usuarios'),
      ]);

      const [prodData, userData] = await Promise.all([
        prodRes.json(),
        userRes.json(),
      ]);

      setProdutos(prodData);
      setUsuarios(userData);
    };

    fetchData();
  }, []);

  return (
    <DashboardLayout>
    <div className="p-6 ">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-blue-500 text-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold">Total de Produtos</h2>
          <p className="text-3xl mt-2">{produtos.length}</p>
        </div>
        <div className="bg-green-500 text-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold">Total de Usuários</h2>
          <p className="text-3xl mt-2">{usuarios.length}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">Últimos Produtos</h2>
        <ul className="divide-y divide-gray-200">
          {produtos
            .sort((a: any, b: any) => new Date(b.criadoEm).getTime() - new Date(a.criadoEm).getTime())
            .slice(0, 5)
            .map((produto: any) => (
              <li key={produto.id} className="py-2">
                <div className="font-medium">{produto.nome}</div>
                <div className="text-sm text-gray-500">R$ {produto.preco.toFixed(2)}</div>
              </li>
            ))}
        </ul>
      </div>
    </div>
    </DashboardLayout>
  );
}
