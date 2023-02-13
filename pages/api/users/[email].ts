import { NextApiRequest, NextApiResponse } from "next";
import type { User, ResponseError } from "../../../interfaces";
import prisma from "../../../lib/prisma";

const userHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<User | ResponseError>
) => {
  if (req.method !== "GET") {
    return res.status(400).json({ message: "Wrong method." });
  }
  const user = await prisma.user.findUnique({
    where: { email: String(req.query.email) },
  });
  return user
    ? res.status(200).json(user)
    : res.status(404).json({ message: "User not found." });
};

export default userHandler;
