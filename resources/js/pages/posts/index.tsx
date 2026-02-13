import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { dashboard } from '@/routes';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import PostCard from '@/components/post-card';

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
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
    {
        title: 'Posts',
        href: '/posts',
    },
];

export default function Posts({ posts }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Posts" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {posts.data.map((post) => (
                        <PostCard post={post} key={post.id} />
                    ))}
                </div>

                {posts.links.length > 3 && (
                    <div className="mt-6 flex flex-wrap justify-center gap-2">
                        {posts.links.map((link, i) => (
                            link.url ? (
                                <Button
                                    key={i}
                                    variant={link.active ? "default" : "outline"}
                                    size="sm"
                                    asChild
                                >
                                    <Link href={link.url}>
                                        <span dangerouslySetInnerHTML={{ __html: link.label }} />
                                    </Link>
                                </Button>
                            ) : (
                                <Button
                                    key={i}
                                    variant="outline"
                                    size="sm"
                                    disabled
                                >
                                    <span dangerouslySetInnerHTML={{ __html: link.label }} />
                                </Button>
                            )
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
