import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router';
import apiClient from '../api/axiosConfig';
import { useTasks } from '../hooks/useTasks';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Textarea from '../components/ui/Textarea';

export default function TaskForm() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const navigate = useNavigate();
    const { id } = useParams();
    const { mutate } = useTasks();

    const isEditMode = Boolean(id);

    useEffect(() => {
        if (isEditMode) {
            apiClient.get(`/tasks/${id}`)
            .then((res) => {
                setTitle(res.data.title);
                setDescription(res.data.description || ""); 
            })
            .catch((error) => {
                console.error(error);
                alert("Gagal memuat data task. Pastikan ID tersebut ada di database.");
            });
        }
    }, [id, isEditMode]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim()) return alert("Judul task wajib diisi!");

        setIsSubmitting(true);
        try {
            if (isEditMode) {
                await apiClient.put(`/tasks/${id}`, { title, description });
            }else {
                await apiClient.post("/tasks", { title, description });
            }
            mutate(); 
            navigate("/"); 
        } catch (error) {
            console.error(error);
            alert(`Gagal ${isEditMode ? "memperbarui" : "menyimpan"} task`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto bg-neo-white border-3 border-neo-black p-8 rounded-2xl shadow-neo-lg">
            {/* Header Form */}
            <div className="flex items-center gap-4 mb-6">
                <Link to="/" className="text-h3 text-neo-black hover:opacity-70 transition-opacity no-underline">
                    ←
                </Link>
                <h2 className="text-h3 font-bold">{isEditMode ? "Edit Task" : "Tambahkan Task"}</h2>
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

                <div className="flex gap-4 mt-2 justify-end">
                    <Button to="/" variant="secondary">Batal</Button>
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Memproses..." : (isEditMode ? "Perbarui Task" : "Simpan Task")}
                    </Button>
                </div>
            </form>
        </div>
    );
}   