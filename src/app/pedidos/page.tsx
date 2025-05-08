'use client';

import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/DashBoardLayout';

interface Pedido {
  id: number;
  produto: {
    nome: string;
    preco: number;
  };
  quantidade: number;
  total: number;
  criadoEm: string;
}

export default function Pedidos() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  useEffect(() => {
    async function fetchPedidos() {
      const res = await fetch('/api/pedidos');
      const data = await res.json();
      setPedidos(data);
    }

    fetchPedidos();
  }, []);

  return (
    <DashboardLayout>
      <main className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-2xl font-bold mb-6">Pedidos</h1>

        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-3 px-6 text-left">Produto</th>
              <th className="py-3 px-6 text-left">Qtd</th>
              <th className="py-3 px-6 text-left">Valor Total</th>
              <th className="py-3 px-6 text-left">Data</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map((pedido) => (
              <tr key={pedido.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-6">{pedido.produto.nome}</td>
                <td className="py-3 px-6">{pedido.quantidade}</td>
                <td className="py-3 px-6">R$ {pedido.total.toFixed(2)}</td>
                <td className="py-3 px-6">
                  {new Date(pedido.criadoEm).toLocaleDateString('pt-BR')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </DashboardLayout>
  );
}
