import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

interface Props {
    post: Post;
}

export default function PostCard({ post }: Props) {
    return (
        <Card key={post.id} className="flex flex-col">
            <CardHeader>
                <CardTitle>{post.title}</CardTitle>
                <CardDescription>
                    {post.user?.name || 'Unknown'}
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
                <p className="line-clamp-3 text-sm text-muted-foreground">
                    {post.body}
                </p>
            </CardContent>
            <CardFooter>
                <span className="text-xs text-muted-foreground">
                    {new Date(post.created_at).toLocaleDateString()}
                </span>
            </CardFooter>
        </Card>
    );
}
