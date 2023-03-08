import React from 'react';
import Link from 'next/link';

export type FullQuoteProps = {
  id: string;
  body: string;
  source: string | null;
  quoteeId: string;
  userId: string;
  quotee: {
    id: string;
    name: string;
    bio: string | null;
  };
  user?: {
    name: string;
  };
};

const FullQuote: React.FC<{ quote: FullQuoteProps }> = ({ quote }) => {
  const { body, quotee, source, user } = quote;
  return (
    <>
      <div>
        <h2>"{body}"</h2>
        <p>
          By <Link href={`/quotees/${quotee.id}`}>{quotee.name}</Link>
        </p>
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

export default FullQuote;
