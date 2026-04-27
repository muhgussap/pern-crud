import { Outlet, Link } from 'react-router';
import Button from '../components/ui/Button';

export default function MainLayout() {
    return (
        <div className="min-h-screen flex flex-col bg-neo-white">
            <header className="border border-neo-black bg-neo-green px-6 py-4 shadow-neo flex justify-between items-center">
                <h1 className="text-h3 font-bold tracking-tight">
                    Task Manager
                </h1>
                <nav className="flex gap-4 items-center">
                    <Button to="/" variant="ghost">Daftar Task</Button>
                    <Button to="/add" variant="primary" className="bg-neo-orange hover:bg-neo-orange-hover">Tambah Task Baru</Button>                
                </nav>
            </header>

            <main className="flex-1 w-full max-w-4xl mx-auto p-6 md:p-10">
                <Outlet/>
            </main>

            <footer className="border-t-2 border-neo-black by-4 text-center">
                <small className="font-medium text-p-sm">&copy; 2026 PERN Stack App - @muhgussap</small>
            </footer>
        </div>
    );
}