'use client';

import { useState } from 'react';
import ModalBase from './ModalBase';

interface ModalCriarProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: () => void;
}

export default function ModalCriarProduto({ isOpen, onClose, onCreate }: ModalCriarProps) {
  const [form, setForm] = useState({
    nome: '',
    descricao: '',
    preco: '',
    quantidade: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    await fetch('/api/produtos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome: form.nome,
        descricao: form.descricao,
        preco: parseFloat(form.preco),
        quantidade: parseInt(form.quantidade),
      }),
    });

    onCreate(); 
    onClose(); 
  };

  return (
    <ModalBase isOpen={isOpen} onClose={onClose} title="Criar Produto">
      <div className="space-y-4">
        <input name="nome" placeholder="Nome" value={form.nome} onChange={handleChange} className="border p-2 w-full" />
        <input name="descricao" placeholder="Descrição" value={form.descricao} onChange={handleChange} className="border p-2 w-full" />
        <input name="preco" placeholder="Preço" type="number" value={form.preco} onChange={handleChange} className="border p-2 w-full" />
        <input name="quantidade" placeholder="Quantidade" type="number" value={form.quantidade} onChange={handleChange} className="border p-2 w-full" />
        <button onClick={handleSubmit} className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600">Salvar</button>
      </div>
    </ModalBase>
  );
}
