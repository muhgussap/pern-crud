import express from 'express';
import cors from 'cors';
import { prisma } from './lib/prisma.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.listen(process.env.APP_PORT, () => {
    console.log(`Server backend berjalan di http://localhost:${process.env.APP_PORT}`);
})

// Middleware
app.use(cors());
app.use(express.json());

// ========================================
// ROUTES UNTUK CRUD TASKS
// ========================================

// CREATE
app.post('/api/tasks', async (req, res) => {
    try {
        const { title, description } = req.body;
        const newTask = await prisma.task.create({
            data: { title, description }
        });
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ error: 'Gagal membuat task baru' });
    }
});

// READ
app.get('/api/tasks', async (req, res) => {
    try {
        const tasks = await prisma.task.findMany({
            orderBy: { createdAt: 'desc' },
        });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Gagal mengambil data task' });
    }
});

// UPDATE
app.put('/api/tasks/:id', async (req, res) => {
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
});

// DELETE
app.delete('/api/tasks/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.task.delete({
            where: { id: Number(id) },
        });
        res.status(200).json({ message: 'Task berhasil dihapus' });
    } catch (error) {
        res.status(500).json({ error: 'Gagal menghapus task' });
    }
});