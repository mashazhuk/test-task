import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { dashboard, login, register } from '@/routes';

export default function Welcome({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    const { auth } = usePage().props as any;

    return (
        <>
            <Head title="Welcome" />
            <div className="flex min-h-screen flex-col items-center justify-center bg-background p-6">
                <header className="absolute top-6 right-6">
                    <nav className="flex items-center gap-4">
                        {!auth.user && (
                            <>
                                <Button asChild variant="ghost">
                                    <Link href={login().url}>Log in</Link>
                                </Button>

                                {canRegister && (
                                    <Button asChild>
                                        <Link href={register().url}>
                                            Register
                                        </Link>
                                    </Button>
                                )}
                            </>
                        )}
                    </nav>
                </header>

                <main className="flex flex-col items-center gap-6 text-center">
                    <h1 className="text-5xl font-bold tracking-tight">
                        Posts project
                    </h1>
                    <p className="text-xl text-muted-foreground">
                        A simple content management system
                    </p>
                    {auth.user && (
                        <Button asChild size="lg" className="mt-4">
                            <Link href={dashboard.url()}>
                                Go to dashboard
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    )}
                </main>
            </div>
        </>
    );
}
