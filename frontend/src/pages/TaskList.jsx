import { useTasks } from '../hooks/useTasks';
import apiClient from '../api/axiosConfig';
import TaskItem from '../components/features/TaskItem';
import Alert from '../components/ui/Alert';

export default function TaskList() {
    const { tasks, isError, isLoading, mutate } = useTasks();

    const handleDelete = async (id) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus task ini?')) {
            try {
                await apiClient.delete(`/tasks/${id}`);
                mutate();
            // eslint-disable-next-line no-unused-vars
            } catch (error) {
                alert("Gagal menghapus task");
            }
        }
    }

    const handleToggleStatus = async (task) => {
        try {
            await apiClient.put(`/tasks/${task.id}`, {
                ...task,
                isCompleted: !task.isCompleted
            });
            mutate();
        // eslint-disable-next-line no-unused-vars
        } catch (error) {
            alert("Gagal mengupdate status");
        }
    };

    if (isLoading) return <Alert variant="info" className="animate-pulse">Memuat data tasks...</Alert>
    if (isError) return <Alert variant="danger">Terjadi kesalahan saat memuat data.</Alert>
    if (!tasks || tasks.length === 0) return <Alert variant="info">Belum ada task. Silakan tambah baru!</Alert>

    const sortedTasks = [...tasks].sort((a, b) => Number(a.isCompleted) - Number(b.isCompleted));

    return (
        <div className="space-y-6">
            <header>
                <h2 className="text-h3 font-bold border-b-3 border-neo-black inline-block pr-4 mb-2">Daftar Task</h2>
            </header>

            <ul className="space-y-4">
                {sortedTasks.map((task) => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        onToggle={handleToggleStatus}
                        onDelete={handleDelete}
                    />
                ))}
            </ul>
        </div>
    );
}