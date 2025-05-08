import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs';
const prisma = new PrismaClient()
async function main() {

    const hashedPassword = await bcrypt.hash('admin', 10);

  const amanda = await prisma.usuario.upsert({
    where: { email: 'amanda@admin.com' },
    update: {},
    create: {
      email: 'amanda@admin.com',
      nome: 'Amanda',
      senha: hashedPassword,
      role: 'ADMIN'
    },
  })

  const aureliano = await prisma.usuario.upsert({
    where: { email: 'aureliano@admin.com' },
    update: {},
    create: {
      email: 'aureliano@admin.com',
      nome: 'Aureliano',
      senha: hashedPassword,
      role: 'ADMIN'
    },
  })
  console.log({ amanda })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })