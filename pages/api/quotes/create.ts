import { NextApiRequest, NextApiResponse } from "next";
import type { ResponseError } from "../../../interfaces";
import type { QuoteProps } from "../../../components/Quote";
import prisma from "../../../lib/prisma";
import { FormData } from "../../../pages/new";

const createQuote = async (body: FormData) => {
  const user = await prisma.user.findUnique({
    where: {
      email: String(body.userEmail),
    }
  });
  const quotee = await prisma.quotee.upsert({
    where: {
      name: String(body.quotee),
    },
    update: {},
    create: {
      name: String(body.quotee),
    },
  });
  const quote = await prisma.quote.create({
    data: {
      body: String(body.quote),
      source: body.source === null ? null : String(body.source),
      quoteeId: quotee.id,
      userId: user.id,
    },
  });
  return quote;
};

const quoteHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<QuoteProps | ResponseError>
) => {
  if (req.method !== "POST") {
    return res.status(400).json({ message: "Wrong method." });
  }
  createQuote(req.body)
    .then((quote) => {
      return res.status(200).json(quote);
    })
    .catch((error) => {
      console.log("error:", error.code);
      if (error.code === "P2002") {
        return res
          .status(409)
          .json({ message: "Quote already exists." });
      }
      return res.status(500).json({ message: "Internal error." });
    });
};

export default quoteHandler;
