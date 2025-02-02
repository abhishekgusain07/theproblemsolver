export interface Post {
    id: number;
    title: string;
    body: string;
    createdAt: Date;
    updatedAt: Date;
    flairs: string[];
}
export interface PostWithCounts extends Post { 
    _count: {
        likes: number;
        comments: number;
    }
}


export interface Like {
    id?:number;
    userId: number;
    postId: number;
    user?: User;
    post?: Post
}

export interface CommentType {
    id: number
    body: string
    createdAt: Date
    updatedAt: Date
    userId: number
    postId: number
    user: {
      id: number
      clerkUserId: string
      email: string
      name?: string | null
    }
    post: {
      id: number
      title: string
      body: string
      createdAt: Date
      updatedAt: Date
    }
}
export interface Comment {
    id?: number; // Optional because it will be generated automatically
    body: string;
    createdAt?: Date; // Optional because it will be generated automatically
    updatedAt?: Date; // Optional because it will be generated automatically
    userId: number;
    postId: number;
    user?: User; // Optional to prevent circular dependency
    post?: Post; // Optional to prevent circular dependency
  }
  
export interface User {
    id?: number;
    clerkUserId: string;
    email: string;
    name?: string;
    likes?: Like[];
    comments?: Comment[];
}

export interface link {
    href: string
    label: string
}