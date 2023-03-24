export type PostType = {
    title: string
    id: string
    createdAt: string
    hearts: string
    user: {
        name: string
        image: string
    }
    Comments?: {
        creadtedAt: string
        id: string
        postId: string
        userId: string
    }[]
}