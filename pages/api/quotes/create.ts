import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import type { ResponseError } from '../../../interfaces';
import type { FormData, QuoteProps } from '../../../pages/new';

const createQuote = async (body: FormData) => {
  const user = await prisma.user.findUnique({
    where: {
      email: String(body.userEmail),
    },
  });
  const quotee = await prisma.quotee.upsert({
    where: {
      name: String(body.quotee),
    },
    update: {},
    create: {
      name: String(body.quotee),
    },
  });
  const quote = await prisma.quote.create({
    data: {
      body: String(body.quote),
      source: body.source === null ? null : String(body.source),
      quoteeId: quotee.id,
      userId: user.id,
    },
  });
  return quote;
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<QuoteProps | ResponseError>
) => {
  if (req.method !== 'POST') {
    return res.status(400).json({ message: 'Wrong method.' });
  }
  createQuote(req.body)
    .then((quote) => {
      return res.status(200).json(quote);
    })
    .catch((error) => {
      console.log('error:', error.code);
      return res.status(500).json({ message: 'Internal error.' });
    });
};

export default handler;
