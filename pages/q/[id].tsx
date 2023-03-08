import React from 'react';
import { GetServerSideProps } from 'next';
import superjson from 'superjson';
import FullQuote from '../../components/Quote/Full';
import { FullQuoteProps } from '../../components/Quote/Full';
import prisma from '../../lib/prisma';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const quote = await prisma.quote.findUnique({
    where: {
      id: String(params?.id),
    },
    include: {
      quotee: {
        select: { id: true, name: true, bio: true },
      },
      user: {
        select: { id: true, name: true },
      },
    },
  });
  const q = () => superjson.serialize(quote).json as any;
  return {
    props: q(),
  };
};

const Quote: React.FC<FullQuoteProps> = (quote) => {
  return <FullQuote quote={quote} />;
};

export default Quote;
