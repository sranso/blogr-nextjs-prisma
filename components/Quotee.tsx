import React from "react";

export type QuoteeProps = {
  id: string;
  name: string;
  bio: string | null;
};

const Quotee: React.FC = () => {
  return (
    <div>
      <h2>quotee name</h2>
      <p>bio here</p>
      <ul>
        all quotes here
        <li>one, etc</li>
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
