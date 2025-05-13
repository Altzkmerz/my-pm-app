import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const pedidos = await prisma.pedido.findMany({
      include: {
        produto: true,
      },
      orderBy: {
        criadoEm: 'desc',
      },
    });

    return NextResponse.json(pedidos);
  } catch (error) {
    console.log(error);
    
    return NextResponse.json({ error: 'Erro ao buscar pedidos' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { produtoId, quantidade } = await req.json();

    // Validate if both fields are present
    if (!produtoId || !quantidade) {
      return NextResponse.json({ error: 'ProdutoId e quantidade são obrigatórios' }, { status: 400 });
    }

    const produto = await prisma.produto.findUnique({
      where: { id: produtoId },
    });

    if (!produto) {
      return NextResponse.json({ error: 'Produto não encontrado' }, { status: 404 });
    }

    if (quantidade > produto.quantidade) {
      return NextResponse.json({ error: 'Estoque insuficiente' }, { status: 400 });
    }

    const total = produto.preco * quantidade;

    const pedido = await prisma.pedido.create({
      data: {
        produtoId,
        quantidade,
        total,
      },
    });

    await prisma.produto.update({
      where: { id: produtoId },
      data: {
        quantidade: produto.quantidade - quantidade,
      },
    });

    return NextResponse.json(pedido, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Erro ao criar pedido' }, { status: 500 });
  }
}
