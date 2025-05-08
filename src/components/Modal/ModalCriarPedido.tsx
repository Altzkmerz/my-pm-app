'use client';

import { useState, useEffect } from 'react';
import ModalBase from './ModalBase';

interface Produto {
  id: number;
  nome: string;
  preco: number;
}

interface ModalCriarPedidoProps {
  isOpen: boolean;
  onClose: () => void;
  produto: Produto | null;
  onPedidoCriado: () => void;
}

export default function ModalCriarPedido({
  isOpen,
  onClose,
  produto,
  onPedidoCriado,
}: ModalCriarPedidoProps) {
  const [quantidade, setQuantidade] = useState(1);

  useEffect(() => {
    setQuantidade(1);
  }, [produto]);

  if (!produto) return null;

  const handleSubmit = async () => {
    await fetch('/api/pedidos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        produtoId: produto.id,
        quantidade,
      }),
    });

    onPedidoCriado();
    onClose();
  };

  return (
    <ModalBase isOpen={isOpen} onClose={onClose} title="Novo Pedido">
      <div className="space-y-4">
        <p>
          Produto: <strong>{produto.nome}</strong>
        </p>
        <p>
          Preço unitário: <strong>R$ {produto.preco.toFixed(2)}</strong>
        </p>

        <label className="block text-sm">Quantidade:</label>
        <input
          type="number"
          min={1}
          value={quantidade}
          onChange={(e) => setQuantidade(parseInt(e.target.value))}
          className="w-full border p-2 rounded"
        />

        <button
          onClick={handleSubmit}
          className="bg-purple-600 hover:bg-purple-700 text-white w-full py-2 rounded"
        >
          Confirmar Pedido
        </button>
      </div>
    </ModalBase>
  );
}
