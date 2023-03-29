import type {NextApiRequest, NextApiResponse} from "next";
import {getServerSession} from "next-auth/next";
import {authOptions} from "../auth/[...nextauth]";
import prisma from "../../../prisma/client";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "GET") {
        let data
        const session = await getServerSession(req, res, authOptions);
        if (!session) return res.status(200).json(data = {});
        //Get all user Posts
        try {
            data = await prisma.user.findUnique({
                where: {
                    email: session?.user?.email,
                },
                include: {
                    Post: {
                        orderBy: {
                            createdAt: "desc",
                        },
                        include: {
                            Comments: true,
                        },
                    },
                },
            });
            res.status(200).json(data);
        } catch (error) {
            res.status(403).json({error: "Something went wrong!!"});
        }
    }
}
