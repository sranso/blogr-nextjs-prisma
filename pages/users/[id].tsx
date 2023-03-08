import React from 'react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import superjson from 'superjson';
import prisma from '../../lib/prisma';
import FeedQuote, { FeedQuoteProps } from '../../components/Quote/Feed';

export type UserProps = {
  id: string;
  name: string;
  email: string;
  quotes: FeedQuoteProps[];
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const user = await prisma.user.findUnique({
    where: {
      id: String(params?.id),
    },
    include: {
      quotes: {
        include: {
          quotee: true,
        },
      },
    },
  });
  const q = () => superjson.serialize(user).json as any;
  return {
    props: q(),
  };
};

const User: React.FC<UserProps> = (user) => {
  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <ul>
        {user.quotes.map((q) => (
          <li key={q.id}>
            <FeedQuote quote={q} />
          </li>
        ))}
      </ul>
      <style jsx>{`
        div {
          color: inherit;
          padding: 2rem;
        }
        li {
          list-style: circle;
        }
      `}</style>
    </div>
  );
};

export default User;
