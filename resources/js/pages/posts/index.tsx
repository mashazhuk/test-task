import { Head, Link, router } from '@inertiajs/react';
import { Plus, Pencil, Trash, Search, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import postRoutes from '@/routes/posts';
import type { BreadcrumbItem, Post, User } from '@/types';

interface PaginationLinks {
    url: string | null;
    label: string;
    active: boolean;
}

interface Props {
    posts: {
        data: Post[];
        links: PaginationLinks[];
        current_page: number;
        last_page: number;
        from: number;
        to: number;
        total: number;
    };
    filters: {
        search?: string;
        user_id?: string;
    };
    users: User[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Posts',
        href: postRoutes.index.url(),
    },
];

export default function Posts({ posts, filters, users }: Props) {
    const [search, setSearch] = useState(filters.search || '');
    const [userId, setUserId] = useState(filters.user_id || '');

    useEffect(() => {
        const timer = setTimeout(() => {
            const params: Record<string, string> = {};
            if (search) params.search = search;
            if (userId) params.user_id = userId;

            router.get(
                postRoutes.index.url(),
                params,
                {
                    preserveState: true,
                    preserveScroll: true,
                    replace: true,
                }
            );
        }, 300);

        return () => clearTimeout(timer);
    }, [search, userId]);

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this post?')) {
            router.delete(postRoutes.destroy(id).url);
        }
    };

    const clearFilters = () => {
        setSearch('');
        setUserId('');
    };

    const hasActiveFilters = search || userId;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Posts" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold tracking-tight">Posts</h1>
                    <Button asChild>
                        <Link href={postRoutes.create().url}>
                            <Plus className="mr-2 h-4 w-4" /> Create post
                        </Link>
                    </Button>
                </div>

                <Card>

                    <CardContent>
                        <div className="flex flex-col gap-4 md:flex-row">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    type="text"
                                    placeholder="Search posts by title or content..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="pl-9"
                                />
                            </div>
                            <div className="w-full md:w-64">
                                <Select
                                    value={userId || undefined}
                                    onValueChange={(value) => setUserId(value || '')}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Filter by author" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {users.map((user) => (
                                            <SelectItem
                                                key={user.id}
                                                value={user.id.toString()}
                                            >
                                                {user.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            {hasActiveFilters && (
                                <Button
                                    variant="outline"
                                    onClick={clearFilters}
                                    className="md:w-auto"
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            )}
                        </div>
                    </CardContent>
                </Card>

                <div className="grid auto-rows-min gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {posts.data.map((post) => (
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
                            <CardFooter className="flex items-center justify-between">
                                <span className="text-xs text-muted-foreground">
                                    {new Date(
                                        post.created_at,
                                    ).toLocaleDateString()}
                                </span>
                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        asChild
                                    >
                                        <Link
                                            href={postRoutes.edit(post.id).url}
                                        >
                                            <Pencil className="h-4 w-4" />
                                        </Link>
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        size="icon"
                                        onClick={() => handleDelete(post.id)}
                                    >
                                        <Trash className="h-4 w-4" />
                                    </Button>
                                </div>
                            </CardFooter>
                        </Card>
                    ))}
                </div>

                {posts.links.length > 3 && (
                    <div className="mt-6 flex flex-wrap justify-center gap-2">
                        {posts.links.map((link, i) =>
                            link.url ? (
                                <Button
                                    key={i}
                                    variant={
                                        link.active ? 'default' : 'outline'
                                    }
                                    size="sm"
                                    asChild
                                >
                                    <Link href={link.url}>
                                        <span
                                            dangerouslySetInnerHTML={{
                                                __html: link.label,
                                            }}
                                        />
                                    </Link>
                                </Button>
                            ) : (
                                <Button
                                    key={i}
                                    variant="outline"
                                    size="sm"
                                    disabled
                                >
                                    <span
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                    />
                                </Button>
                            ),
                        )}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
