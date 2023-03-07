import React from "react";
import Router from "next/router";

export type QuoteProps = {
  id: string;
  body: string;
  source: string | null;
  quoteeId: string,
  userId: string,
  quotee?: {
    name: string;
    bio: string | null;
  };
  user?: {
    name: string;
    email: string;
  };
};

const Quote: React.FC<{ quote: QuoteProps }> = ({ quote }) => {
  return (
    <div onClick={() => Router.push("/q/[id]", `/q/${quote.id}`)}>
      <h2>{quote.body}</h2>
      <small>By {quote.quotee?.name}</small>
      <style jsx>{`
        div {
          color: inherit;
          padding: 2rem;
        }
      `}</style>
    </div>
  );
};

export default Quote;
