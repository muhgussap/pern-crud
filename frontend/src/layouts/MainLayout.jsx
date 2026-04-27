import { Outlet, Link } from 'react-router';
import Button from '../components/ui/Button';

export default function MainLayout() {
    return (
        <div className="bg-neo-white flex min-h-screen flex-col">
            <header className="border-neo-black bg-neo-green shadow-neo flex items-center justify-between border px-6 py-4">
                <h1 className="text-h3 font-bold tracking-tight">Task Manager</h1>
                <nav className="flex items-center gap-4">
                    <Button to="/" variant="ghost">
                        Daftar Task
                    </Button>
                    <Button
                        to="/add"
                        variant="primary"
                        className="bg-neo-orange hover:bg-neo-orange-hover">
                        Tambah Task Baru
                    </Button>
                </nav>
            </header>

            <main className="mx-auto w-full max-w-4xl flex-1 p-6 md:p-10">
                <Outlet />
            </main>

            <footer className="border-neo-black by-4 border-t-2 text-center">
                <small className="text-p-sm font-medium">
                    &copy; 2026 PERN Stack App - @muhgussap
                </small>
            </footer>
        </div>
    );
}
