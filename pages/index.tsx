import React from 'react';
import { GetStaticProps } from 'next';
import superjson from 'superjson';
import FeedQuote, { FeedQuoteProps } from '../components/Quote/Feed';
import prisma from '../lib/prisma';

export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.quote.findMany({
    include: {
      quotee: {
        select: { name: true, bio: true },
      },
    },
  });
  const serialized = feed.map((f) => superjson.serialize(f).json);
  return {
    props: { feed: serialized },
    revalidate: 10,
  };
};

type Props = {
  feed: FeedQuoteProps[];
};

const Feed: React.FC<Props> = (props) => {
  return (
    <>
      <div className='page'>
        <h1>Public Feed</h1>
        <main>
          {props.feed.map((quote) => (
            <div key={quote.id} className='quote'>
              <FeedQuote quote={quote} />
            </div>
          ))}
        </main>
      </div>
      <style jsx>{`
        .quote {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }

        .quote:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .quote + .quote {
          margin-top: 2rem;
        }
      `}</style>
    </>
  );
};

export default Feed;
