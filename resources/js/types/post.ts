interface Post {
    id: number;
    title: string;
    body: string;
    created_at: string;
    user?: {
        name: string;
    };
}
