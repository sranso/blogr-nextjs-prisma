import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const quoteeRilke = await prisma.quotee.upsert({
    where: { name: 'Rainer Maria Rilke' },
    update: {},
    create: {
      name: 'Rainer Maria Rilke',
      bio: 'Austrian poet'
    },
  });
  const quoteeDidion = await prisma.quotee.upsert({
    where: { name: 'Joan Didion' },
    update: {},
    create: {
      name: 'Joan Didion',
    },
  });
  const quoteeUnknown = await prisma.quotee.upsert({
    where: { name: 'Unknown' },
    update: {},
    create: {
      name: 'Unknown',
    },
  });

  const userSarah = await prisma.user.upsert({
    where: { email: 'sranso@gmail.com' },
    update: {},
    create: {
      name: 'Sarah R',
      email: 'sranso@gmail.com',
      quotes: {
        create: [
          {
            body: 'Let life happen to you. Believe me: life is in the right, always.',
            source: null,
            quoteeId: quoteeRilke.id,
          },
          {
            body: 'I write entirely to find out what I\'m thinking, what I\'m looking at, what I see and what it means. What I want and what I fear.',
            source: null,
            quoteeId: quoteeDidion.id,
          }
        ],
      },
    },
  });


  const userKiron = await prisma.user.upsert({
    where: { email: 'kiron@gmail.com' },
    update: {},
    create: {
      name: 'Kiron K',
      email: 'kiron@gmail.com',
      quotes: {
        create: [
          {
            body: 'And now we welcome the new year. Full of things that have never been.',
            source: null,
            quoteeId: quoteeRilke.id,
          },
        ],
      },
    },
  });

  console.log({ userSarah, userKiron });
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
