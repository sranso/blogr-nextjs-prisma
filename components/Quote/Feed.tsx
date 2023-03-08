import React from 'react';
import Link from 'next/link';
import Router from 'next/router';

export type FeedQuoteProps = {
  id: string;
  body: string;
  source: string | null;
  userId: string;
  quotee: {
    id: string;
    name: string;
    bio: string | null;
  };
};

const FeedQuote: React.FC<{ quote: FeedQuoteProps }> = ({ quote }) => {
  const { quotee } = quote;
  return (
    <div onClick={() => Router.push('/q/[id]', `/q/${quote.id}`)}>
      <h2>"{quote.body}"</h2>
      <small>
        By <Link href={`/quotees/${quotee.id}`}>{quotee.name}</Link>
      </small>
      <style jsx>{`
        div {
          color: inherit;
          padding: 2rem;
        }
      `}</style>
    </div>
  );
};

export default FeedQuote;
