import { Routes, Route } from 'react-router-dom';
import { MainLayout } from '../layout/MainLayout';
import { Home } from '../pages/home';
import Login from '../pages/login';
import Register from '../pages/register';

export function AppRouter() {
    return (
        <Routes>
            <Route element={<MainLayout/>}>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login/>}></Route>
                <Route path='/register' element={<Register/>}/>
            </Route>
        </Routes>
    )
}