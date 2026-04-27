import { Routes, Route } from 'react-router';
import MainLayout from './layouts/MainLayout';
import TaskList from './pages/TaskList';
import TaskForm from './pages/TaskForm';

function App() {
    return (
        <Routes>
            {/* MainLayout bertindak sebagai pembungkus utama */}
            <Route element={<MainLayout />}>
                {/* Rute-rute anak yang akan masuk ke dalam <Outlet /> di MainLayout */}
                <Route path="/" element={<TaskList />} />
                <Route path="/add" element={<TaskForm />} />
                <Route path="/edit/:id" element={<TaskForm />} />
            </Route>
        </Routes>
    );
}

export default App;
