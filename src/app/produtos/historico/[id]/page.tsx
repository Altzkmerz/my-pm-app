'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import DashboardLayout from '@/components/DashBoardLayout';

interface Alteracao {
  id: number;
  acao: string;
  antes: any;
  depois: any;
  criadoEm: string;
}

export default function HistoricoProduto() {
  const { id } = useParams();
  const [historico, setHistorico] = useState<Alteracao[]>([]);

  useEffect(() => {
    async function fetchHistorico() {
      const res = await fetch(`/api/produtos/${id}/historico`);
      const data = await res.json();
      setHistorico(data);
    }

    fetchHistorico();
  }, [id]);

  return (
    <DashboardLayout>
      <main className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-2xl font-bold mb-6">Histórico do Produto #{id}</h1>

        {historico.length === 0 ? (
          <p>Nenhuma alteração registrada.</p>
        ) : (
          <div className="space-y-6">
            {historico.map((item) => (
              <div key={item.id} className="bg-white p-4 shadow rounded border">
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">
                    Ação: {item.acao}
                  </span>
                  <span className="text-sm text-gray-500">
                    {new Date(item.criadoEm).toLocaleString('pt-BR')}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  {item.antes && (
                    <div>
                      <p className="font-medium mb-1">Antes:</p>
                      <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto">
                        {JSON.stringify(item.antes, null, 2)}
                      </pre>
                    </div>
                  )}
                  {item.depois && (
                    <div>
                      <p className="font-medium mb-1">Depois:</p>
                      <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto">
                        {JSON.stringify(item.depois, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </DashboardLayout>
  );
}
