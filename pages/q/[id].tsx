import React from "react";
import { GetServerSideProps } from "next";
import Link from "next/link";
import superjson from "superjson";
import { QuoteProps } from "../../components/Quote";
import prisma from "../../lib/prisma";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const quote = await prisma.quote.findUnique({
    where: {
      id: String(params?.id),
    },
    include: {
      quotee: {
        select: { name: true, bio: true },
      },
      user: {
        select: { name: true },
      },
    },
  });
  const q = () => superjson.serialize(quote).json as any;
  return {
    props: q(),
  };
};

const Quote: React.FC<QuoteProps> = ({ body, quotee, user, source }) => {
  return (
    <>
      <div>
        <h2>{body}</h2>
        <p>By {quotee.name}</p>
        {quotee.bio?.length > 0 ? <p>Bio: {quotee.bio}</p> : <></>}
        <p>Added by {user.name}</p>
        {source === null ? (
          <></>
        ) : (
          <p>
            Read more <Link href={source}>here.</Link>
          </p>
        )}
      </div>
      <style jsx>{`
        .page {
          background: white;
          padding: 2rem;
        }

        .actions {
          margin-top: 2rem;
        }

        button {
          background: #ececec;
          border: 0;
          border-radius: 0.125rem;
          padding: 1rem 2rem;
        }

        button + button {
          margin-left: 1rem;
        }
      `}</style>
    </>
  );
};

export default Quote;
