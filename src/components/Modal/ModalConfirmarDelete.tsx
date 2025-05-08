"use client";

import ModalBase from "./ModalBase";

interface ModalDeleteProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ModalConfirmarDelete({
  isOpen,
  onClose,
  onConfirm,
}: ModalDeleteProps) {
  return (
    <ModalBase isOpen={isOpen} onClose={onClose} title="Excluir Produto">
      <p className="mb-4">Tem certeza que deseja excluir este produto?</p>
      <div className="flex justify-end gap-4">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Cancelar
        </button>
        <button
          onClick={onConfirm}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Excluir
        </button>
      </div>
    </ModalBase>
  );
}
