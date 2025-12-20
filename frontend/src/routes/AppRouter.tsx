import { Routes, Route } from 'react-router-dom';
import { MainLayout } from '../layout/MainLayout';
import { Home } from '../pages/home';
import Login from '../pages/login';
import Register from '../pages/register';
import { Account } from '../pages/Account';

export function AppRouter() {
    return (
        <Routes>
            <Route element={<MainLayout/>}>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login/>}></Route>
                <Route path='/register' element={<Register/>}/>
                <Route path='/mi-perfil' element={<Account/>}/>
            </Route>
        </Routes>
    )
}