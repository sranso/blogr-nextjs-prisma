import React from "react";
import Router from "next/router";

export type QuoteProps = {
  id: string;
  body: string;
  source: string | null;
  quotee: {
    name: string;
    bio: string | null;
  };
  user: {
    name: string;
    email: string;
  };
};

const Quote: React.FC<{ quote: QuoteProps }> = ({ quote }) => {
  const quotee = quote.quotee;
  return (
    <div onClick={() => Router.push("/q/[id]", `/q/${quote.id}`)}>
      <h2>{quote.body}</h2>
      <small>By {quotee.name}</small>
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
