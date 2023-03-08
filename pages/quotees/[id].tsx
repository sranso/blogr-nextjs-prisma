import React from 'react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import superjson from 'superjson';
import prisma from '../../lib/prisma';

export type QuoteeProps = {
  id: string;
  name: string;
  bio: string | null;
  quotes: {
    id: string;
    body: string;
  }[];
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const quotee = await prisma.quotee.findUnique({
    where: {
      id: String(params?.id),
    },
    include: {
      quotes: {
        select: {
          id: true,
          body: true,
        },
      },
    },
  });
  const q = () => superjson.serialize(quotee).json as any;
  return {
    props: q(),
  };
};

const Quotee: React.FC<QuoteeProps> = (quotee) => {
  return (
    <div>
      <h2>{quotee.name}</h2>
      {quotee.bio ? <p>{quotee.bio}</p> : <></>}
      <ul>
        {quotee.quotes.map((q) => (
          <li key={q.id}>
            <Link href={`/q/${q.id}`}>"{q.body}"</Link>
          </li>
        ))}
      </ul>
      <style jsx>{`
        div {
          color: inherit;
          padding: 2rem;
        }
      `}</style>
    </div>
  );
};

export default Quotee;
