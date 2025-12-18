import { Routes, Route } from 'react-router-dom';
import { MainLayout } from '../layout/MainLayout';
import { Home } from '../pages/home';

export function AppRouter() {
    return (
        <Routes>
            <Route element={<MainLayout/>}>
                <Route path='/' element={<Home />} />
            </Route>
        </Routes>
    )
}