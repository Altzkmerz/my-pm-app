import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    try {
      const produtos = await prisma.produto.findMany();
      return new Response(JSON.stringify(produtos), { status: 200 });
    } catch (error) {
        console.log(error);
        
      return new Response('Erro ao buscar produtos', { status: 500 });
    }
}

export async function POST(req: Request) {
  const body = await req.json();
  const { nome, descricao, preco, quantidade } = body;

  if (!nome || !descricao || preco == null || quantidade == null) {
    return NextResponse.json({ error: 'Campos obrigatórios ausentes' }, { status: 400 });
  }

  try {
    const novoProduto = await prisma.produto.create({
      data: {
        nome,
        descricao,
        preco,
        quantidade,
      },
    });

    return NextResponse.json(novoProduto, { status: 201 });
  } catch (err) {
    console.error('Erro ao criar produto:', err);
    return NextResponse.json({ error: 'Erro interno ao criar produto' }, { status: 500 });
  }
}