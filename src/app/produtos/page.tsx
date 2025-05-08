"use client";

import { useState, useEffect } from "react";
import {
  FaEdit,
  FaHistory,
  FaPlus,
  FaShoppingCart,
  FaTrashAlt,
} from "react-icons/fa";
import DashboardLayout from "@/components/DashBoardLayout";
import ModalCriarProduto from "@/components/Modal/ModalCriarProduto";
import ModalEditarProduto from "@/components/Modal/ModalEditarProduto";
import ModalConfirmarDelete from "@/components/Modal/ModalConfirmarDelete";
import ModalCriarPedido from "@/components/Modal/ModalCriarPedido";
import { useRouter } from "next/navigation";

interface Produto {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  quantidade: number;
}

export default function Produtos() {
  const router = useRouter();

  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [produtoEditando, setProdutoEditando] = useState<Produto | null>(null);
  const [produtoDeletando, setProdutoDeletando] = useState<Produto | null>(
    null
  );
  const [showCriar, setShowCriar] = useState(false);
  const [showEditar, setShowEditar] = useState(false);
  const [showConfirmarDelete, setShowConfirmarDelete] = useState(false);

  const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(
    null
  );
  const [showPedidoModal, setShowPedidoModal] = useState(false);

  const fetchProdutos = async () => {
    const res = await fetch("/api/produtos");
    const data = await res.json();
    setProdutos(data);
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  const abrirEditar = (produto: Produto) => {
    setProdutoEditando(produto);
    setShowEditar(true);
  };

  const abrirDeletar = (produto: Produto) => {
    setProdutoDeletando(produto);
    setShowConfirmarDelete(true);
  };

  const handleDelete = async () => {
    if (!produtoDeletando) return;

    await fetch(`/api/produtos/${produtoDeletando.id}`, {
      method: "DELETE",
    });

    setProdutos(produtos.filter((p) => p.id !== produtoDeletando.id));
    setProdutoDeletando(null);
    setShowConfirmarDelete(false);
  };

  const abrirModalPedido = (produto: Produto) => {
    setProdutoSelecionado(produto);
    setShowPedidoModal(true);
  };

  return (
    <DashboardLayout>
      <main className="min-h-screen bg-gray-100">
        <div className="container mx-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Lista de Produtos</h1>
            <button
              onClick={() => setShowCriar(true)}
              className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              <FaPlus /> Criar Produto
            </button>
          </div>

          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-3 px-6 text-left">Nome</th>
                <th className="py-3 px-6 text-left">Descrição</th>
                <th className="py-3 px-6 text-left">Preço</th>
                <th className="py-3 px-6 text-left">Qtd</th>
                <th className="py-3 px-6 text-left">Ações</th>
              </tr>
            </thead>
            <tbody>
              {produtos.map((produto) => (
                <tr key={produto.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-6">{produto.nome}</td>
                  <td className="py-3 px-6">{produto.descricao}</td>
                  <td className="py-3 px-6">R$ {produto.preco.toFixed(2)}</td>
                  <td className="py-3 px-6">{produto.quantidade}</td>
                  <td className="py-3 px-6 flex gap-4">
                    <FaEdit
                      className="text-green-500 cursor-pointer"
                      size={20}
                      onClick={() => abrirEditar(produto)}
                    />
                    <FaTrashAlt
                      className="text-red-500 cursor-pointer"
                      size={20}
                      onClick={() => abrirDeletar(produto)}
                    />
                    <FaShoppingCart
                      className="text-purple-600 cursor-pointer"
                      size={20}
                      title="Criar pedido"
                      onClick={() => abrirModalPedido(produto)}
                    />
                    <FaHistory
                      className="text-gray-600 cursor-pointer"
                      size={20}
                      title="Ver histórico"
                      onClick={() =>
                        router.push(`/produtos/historico/${produto.id}`)
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <ModalCriarProduto
          isOpen={showCriar}
          onClose={() => setShowCriar(false)}
          onCreate={fetchProdutos}
        />

        <ModalEditarProduto
          isOpen={showEditar}
          onClose={() => setShowEditar(false)}
          produto={produtoEditando}
          onUpdate={fetchProdutos}
        />

        <ModalConfirmarDelete
          isOpen={showConfirmarDelete}
          onClose={() => setShowConfirmarDelete(false)}
          onConfirm={handleDelete}
        />

        <ModalCriarPedido
          isOpen={showPedidoModal}
          onClose={() => setShowPedidoModal(false)}
          produto={produtoSelecionado}
          onPedidoCriado={() => console.log("Pedido criado")}
        />
      </main>
    </DashboardLayout>
  );
}
