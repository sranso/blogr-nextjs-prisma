import React, { useState } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import superjson from "superjson";
import prisma from "../lib/prisma";
import { QuoteeProps  } from "../components/Quotee";
import { QuoteProps } from "../components/Quote";
import type { ResponseError } from "../interfaces";

const isQuote = (
  data: QuoteProps | ResponseError
): data is QuoteProps => (
  (data as QuoteProps).id !== undefined
);

export const getServerSideProps: GetServerSideProps = async () => {
  const quotees = await prisma.quotee.findMany();
  const serialized = quotees.map((f) => superjson.serialize(f).json);
  return {
    props: {
      quotees: serialized,
    },
  };
};

type Props = {
  quotees: QuoteeProps[];
  email: string | null;
};

export type FormData = {
  quote: string;
  quotee: string;
  source: string | null;
  userEmail: string;
};

const NewQuote: React.FC<Props> = ({ quotees }) => {
  const [quotee, setQuotee] = useState(quotees[0].name);
  const router = useRouter();

  const createQuote = async (formData: FormData) => {
    const res = await fetch('/api/quotes/create', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data: QuoteProps | ResponseError = await res.json();

    if (res.status === 200 && isQuote(data)) {
      router.push(`/q/${data.id}`);
    }
    if (res.status === 405) {
      console.error("error", data);
    }
  };

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      quote: { value: string };
      newQuotee: { value: string | null };
      source: { value: string | null };
    };
    const { quote, newQuotee, source } = target;
    const formData = {
      quote: quote.value,
      quotee: quotee === "new" ? newQuotee.value : quotee,
      source: source?.value?.length ? source.value : null,
      userEmail: 'sranso@gmail.com',
    };

    createQuote(formData);
  };

  return (
    <>
      <form onSubmit={onSubmit}>
      <p>Add new quote</p>

      <label>
        Quote* <br/>
        <textarea
          autoFocus
          id="quote"
          name="quote"
          rows={4}
        />
      </label>

      <label>
        Quotee* <br/>
        <select
          id="quotee"
          name="quotee"
          value={quotee}
          onChange={(e) => setQuotee(e.target.value)}
        >
          {quotees.map((q: QuoteeProps) => (
            <option key={q.name} value={q.name}>{q.name}</option>
          ))}
          <option value="new">Create new</option>
        </select>
      </label>

      {quotee === "new" ?
        <label>
          Add new quotee*
          <input
            id="newQuotee"
            name="newQuotee"
            type="text"
            placeholder="Full name"
          /></label>
        : <></>
      }

      <label>
        Source<br/>
        <input
          id="source"
          name="source"
          type="text"
          placeholder="eg https://www.goodreads.com/quotes/22534..."
        />
      </label>

      <button type="submit" value="Submit">Submit</button>
    </form>

    <style jsx>{`
      form {
        display: flex;
        flex-direction: column;
      }
      label {
        margin-bottom: 1.5rem;
      }
      textarea, input, select {
        width: 100%;
      }
    `}</style>
    </>
  );
};

export default NewQuote;
