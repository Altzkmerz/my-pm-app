'use client';

import { useState, useEffect } from 'react';
import ModalBase from './ModalBase';

interface Produto {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  quantidade: number;
}

interface ModalEditarProps {
  isOpen: boolean;
  onClose: () => void;
  produto: Produto | null;
  onUpdate: () => void;
}

export default function ModalEditarProduto({ isOpen, onClose, produto, onUpdate }: ModalEditarProps) {
  const [form, setForm] = useState<Produto | null>(produto);

  useEffect(() => {
    setForm(produto);
  }, [produto]);

  if (!form) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === 'preco' || name === 'quantidade' ? Number(value) : value } as Produto);
  };

  const handleSubmit = async () => {
    await fetch(`/api/produtos/${form.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    onUpdate();
    onClose();
  };

  return (
    <ModalBase isOpen={isOpen} onClose={onClose} title="Editar Produto">
      <div className="space-y-4">
        <input name="nome" value={form.nome} onChange={handleChange} className="border p-2 w-full" />
        <input name="descricao" value={form.descricao} onChange={handleChange} className="border p-2 w-full" />
        <input name="preco" type="number" value={form.preco} onChange={handleChange} className="border p-2 w-full" />
        <input name="quantidade" type="number" value={form.quantidade} onChange={handleChange} className="border p-2 w-full" />
        <button onClick={handleSubmit} className="bg-green-500 text-white w-full py-2 rounded hover:bg-green-600">Salvar Alterações</button>
      </div>
    </ModalBase>
  );
}
