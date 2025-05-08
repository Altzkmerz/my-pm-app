import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const produto = await prisma.produto.findUnique({
      where: { id: Number(params.id) },
    });

    if (!produto) {
      return NextResponse.json({ error: 'Produto não encontrado' }, { status: 404 });
    }

    return NextResponse.json(produto);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar o produto' }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const { nome, descricao, preco, quantidade } = await req.json();
    const id = Number(params.id);
  
    const produtoAtual = await prisma.produto.findUnique({ where: { id } });
  
    if (!produtoAtual) {
      return NextResponse.json({ error: 'Produto não encontrado' }, { status: 404 });
    }
  
    const produtoAtualizado = await prisma.produto.update({
      where: { id },
      data: { nome, descricao, preco: parseFloat(preco), quantidade },
    });
  
    await prisma.alteracaoProduto.create({
      data: {
        produtoId: id,
        acao: 'EDICAO',
        antes: produtoAtual,
        depois: produtoAtualizado,
      },
    });
  
    return NextResponse.json(produtoAtualizado);
  }

  export async function DELETE(_: Request, { params }: { params: { id: string } }) {
    try {
      const id = Number(params.id);
  
      const produto = await prisma.produto.findUnique({
        where: { id },
      });
  
      if (!produto) {
        return NextResponse.json({ error: 'Produto não encontrado' }, { status: 404 });
      }
  
      await prisma.produto.delete({
        where: { id },
      });
  
      await prisma.alteracaoProduto.create({
        data: {
          produtoId: produto.id,
          acao: 'EXCLUSAO',
          antes: produto,
        },
      });
  
      return NextResponse.json({ message: 'Produto deletado com sucesso' });
    } catch (error) {
      console.error('Erro ao deletar produto:', error);
      return NextResponse.json({ error: 'Erro ao deletar o produto' }, { status: 500 });
    }
  }