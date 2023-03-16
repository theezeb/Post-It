import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);
    if (!session)
      return res
        .status(401)
        .json({ message: "Please sign in to make a Post." });

    const title: string = req.body.title;

    //Get User
    const primsaUser = await prisma.user.findUnique({
      where: {
        email: session?.user?.email,
      },
    });

    if (title.length >= 300) {
      res.status(403).json({ message: "Please Write a smaller Post." });
    }
    if (!title.length) {
      res.status(403).json({ message: "Please Dont't leave it empty" });
    }

    try {
      const result = await prisma.post.create({
        data: {
          title,
          userId: primsaUser.id,
        },
      });
      res.status(200).json({ result });
    } catch (error) {
      res.status(403).json({ error: "Something went wrong!!" });
    }
  }
}
