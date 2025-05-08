import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const produtoId = Number(params.id);

  try {
    const historico = await prisma.alteracaoProduto.findMany({
      where: { produtoId },
      orderBy: { criadoEm: 'desc' },
    });

    return NextResponse.json(historico);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar histórico' }, { status: 500 });
  }
}
