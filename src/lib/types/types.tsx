export interface Post {
    id: number;
    title: string;
    body: string;
    createdAt: Date;
    updatedAt: Date;
}
export interface PostWithCounts extends Post { 
    _count: {
        likes: number;
        comments: number;
    }
}