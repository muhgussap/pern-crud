import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router';
import apiClient from '../api/axiosConfig';
import { useTasks } from '../hooks/useTasks';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Textarea from '../components/ui/Textarea';

export default function TaskForm() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();
    const { id } = useParams();
    const { mutate } = useTasks();

    const isEditMode = Boolean(id);

    useEffect(() => {
        if (isEditMode) {
            apiClient
                .get(`/tasks/${id}`)
                .then((res) => {
                    setTitle(res.data.title);
                    setDescription(res.data.description || '');
                })
                .catch((error) => {
                    console.error(error);
                    alert('Gagal memuat data task. Pastikan ID tersebut ada di database.');
                });
        }
    }, [id, isEditMode]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim()) return alert('Judul task wajib diisi!');

        setIsSubmitting(true);
        try {
            if (isEditMode) {
                await apiClient.put(`/tasks/${id}`, { title, description });
            } else {
                await apiClient.post('/tasks', { title, description });
            }
            mutate();
            navigate('/');
        } catch (error) {
            console.error(error);
            alert(`Gagal ${isEditMode ? 'memperbarui' : 'menyimpan'} task`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-neo-white border-neo-black shadow-neo-lg mx-auto max-w-xl rounded-2xl border-3 p-8">
            {/* Header Form */}
            <div className="mb-6 flex items-center gap-4">
                <Link
                    to="/"
                    className="text-h3 text-neo-black no-underline transition-opacity hover:opacity-70">
                    ←
                </Link>
                <h2 className="text-h3 font-bold">{isEditMode ? 'Edit Task' : 'Tambahkan Task'}</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                    label="Judul Task"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Contoh: Belajar Clean Architecture"
                    required
                />
                <Textarea
                    label="Deskripsi"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Tulis detail spesifik tugas disini..."
                />

                <div className="mt-2 flex justify-end gap-4">
                    <Button to="/" variant="secondary">
                        Batal
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting
                            ? 'Memproses...'
                            : isEditMode
                              ? 'Perbarui Task'
                              : 'Simpan Task'}
                    </Button>
                </div>
            </form>
        </div>
    );
}
