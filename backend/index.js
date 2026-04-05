import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import taskRoute from './routes/TaskRoute.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routing
app.use('/api/tasks', taskRoute);

app.get('/', (req, res) => {
    res.send('PERN CRUD API is running!');
});

app.listen(process.env.APP_PORT, () => {
    console.log(`Server backend berjalan di http://localhost:${process.env.APP_PORT}`);
});