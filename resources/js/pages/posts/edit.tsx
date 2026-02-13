import { Head, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

interface Post {
    id: number;
    title: string;
    body: string;
}

interface Props {
    post: Post;
}

export default function Edit({ post: initialPost }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Posts',
            href: '/posts',
        },
        {
            title: 'Edit post',
            href: `/posts/${initialPost.id}/edit`,
        },
    ];

    const { data, setData, put, processing, errors } = useForm({
        title: initialPost.title,
        body: initialPost.body,
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        put(`/posts/${initialPost.id}`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit post" />
            <div className="mx-auto flex h-full w-full max-w-2xl flex-1 flex-col gap-4 p-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Edit post</CardTitle>
                        <CardDescription>Update your post.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">Title</Label>
                                <Input
                                    id="title"
                                    value={data.title}
                                    onChange={(e) =>
                                        setData('title', e.target.value)
                                    }
                                    placeholder="Post title"
                                />
                                {errors.title && (
                                    <p className="text-sm text-destructive">
                                        {errors.title}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="body">Content</Label>
                                <Textarea
                                    id="body"
                                    value={data.body}
                                    onChange={(e) =>
                                        setData('body', e.target.value)
                                    }
                                    placeholder="Write something..."
                                    className="min-h-[200px]"
                                />
                                {errors.body && (
                                    <p className="text-sm text-destructive">
                                        {errors.body}
                                    </p>
                                )}
                            </div>

                            <div className="flex justify-end pt-4">
                                <Button type="submit" disabled={processing}>
                                    Update post
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
