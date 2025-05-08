import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const SECRET = 'supersecret';

export async function POST(req: Request) {
  const { email, senha } = await req.json();

  console.log("AQUI");

  const usuario = await prisma.usuario.findUnique({ where: { email } });

  console.log(usuario);
  console.log(!usuario, !(await bcrypt.compare(senha, usuario.senha)));

  if (!(await bcrypt.compare(senha, usuario.senha))) {
    return NextResponse.json({ error: 'Credenciais inválidas' }, { status: 401 });
  }

  const token = jwt.sign({ id: usuario.id, email: usuario.email }, SECRET, { expiresIn: '1h' });

  return NextResponse.json({ token, usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email } });
}
