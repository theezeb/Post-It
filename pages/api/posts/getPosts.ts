import type {NextApiRequest, NextApiResponse} from "next";
import prisma from "../../../prisma/client";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const session = await getServerSession(req, res, authOptions);
      const primsaUser = await prisma.user.findUnique({
        where: {
          email: session?.user?.email,
        },
      });
  
      const data = await prisma.post.findMany({
        include: {
          user: true,
          Comments: true,
          hearts: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      res.status(200).json([data,primsaUser]);
    } catch (error) {
      res.status(403).json({error: "Error Fetching Post!!"});
    }
  }
}
