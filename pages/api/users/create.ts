import { NextApiRequest, NextApiResponse } from "next";
import type { User, ResponseError } from "../../../interfaces";
import prisma from "../../../lib/prisma";

const createUser = async (body: { email: string; name: string }) => {
  const user = await prisma.user.create({
    data: {
      email: String(body.email),
      name: String(body.name),
    },
  });
  return user;
};

const userHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<User | ResponseError>
) => {
  if (req.method !== "POST") {
    return res.status(400).json({ message: "Wrong method." });
  }
  createUser(req.body)
    .then((user) => {
      return res.status(200).json(user);
    })
    .catch((error) => {
      console.log("error", error.code);
      if (error.code === "P2002") {
        return res
          .status(409)
          .json({ message: "User exists. Please sign in." });
      }
      return res.status(500).json({ message: "Internal error." });
    });
};

export default userHandler;
