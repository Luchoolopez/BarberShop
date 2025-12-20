import { Routes, Route } from 'react-router-dom';
import { MainLayout } from '../layout/MainLayout';
import { Home } from '../pages/home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import { Account } from '../pages/Account';
import { AdminRoute } from './AdminRoute';
import { AdminHome } from '../pages/admin/AdminHome';
import { AdminServices } from '../pages/admin/AdminServices';
import { AdminLayout } from '../layout/AdminLayout';

export function AppRouter() {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path='/' element={<Home />} />
                <Route path='/iniciar-sesion' element={<Login />}></Route>
                <Route path='/registrarse' element={<Register />} />
                <Route path='/mi-perfil' element={<Account />} />
            </Route>

            <Route element={<AdminRoute />}>
                <Route element={<AdminLayout/>}>
                    <Route path='/admin' element={<AdminHome />} />
                    <Route path='/admin/servicios' element={<AdminServices />} />
                </Route>
            </Route>
        </Routes>
    )
}