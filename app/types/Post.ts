export type PostType = {
    id: string
    title: string
    updatedAt?: string
    user: {
        email: string
        id: string
        name: string
        image: string
    }
    Comments?: {
        creadtedAt?: string
        id: string
        postId: string
        userId: string
        title: string
        user: {
            email: string
            id: string
            name: string
            image: string
        }
    }[]
}