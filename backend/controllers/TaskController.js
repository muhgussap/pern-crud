import { prisma } from '../lib/prisma.js';

export const getTasks = async (req, res) => {
    try {
        const tasks = await prisma.task.findMany({
            orderBy: { 
                createdAt: 'desc'
            },
        });
        res.status(200).json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Gagal mengambil data task' });
    }
};

export const getTasksById = async (req, res) => {
    try {
        const tasks = await prisma.task.findUnique({
            where: { 
                id: Number(req.params.id)
            },
        })
        res.status(200).json(tasks);
    } catch (error) {
        console.error(error);
        res.status(404).json({ error: 'Task tidak ditemukan' });
    }
};

export const createTask = async (req, res) => {
    try {
        const { title, description } = req.body;
        const newTask = await prisma.task.create({
            data: { title, description },
        });
        res.status(201).json(newTask);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Gagal membuat task baru' });
    }
};

export const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, isCompleted } = req.body;

        const updatedTask = await prisma.task.update({
            where: { id: Number(id) },
            data: { title, description, isCompleted },
        });
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ error: 'Gagal memperbarui task' });
    }
};

export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.task.delete({
            where: { id: Number(id) },
        });
        res.status(200).json({ message: 'Task berhasil dihapus' });
    } catch (error) {
        res.status(500).json({ error: 'Gagal menghapus task' });
    }
};