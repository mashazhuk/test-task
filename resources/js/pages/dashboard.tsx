import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import postRoutes from '@/routes/posts';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard.url(),
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col items-center justify-center gap-6 p-4">
                <div className="flex flex-col items-center gap-4 text-center">
                    <h1 className="text-4xl font-bold tracking-tight">
                        Hello
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        Welcome to posts project
                    </p>
                    <Button asChild size="lg" className="mt-4">
                        <Link href={postRoutes.index.url()}>
                            View posts
                        </Link>
                    </Button>
                </div>
            </div>
        </AppLayout>
    );
}
