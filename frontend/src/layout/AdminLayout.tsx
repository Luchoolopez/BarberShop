import { Outlet } from 'react-router-dom';
import { AdminSidebar } from '../components/admin/AdminSidebar';

export const AdminLayout = () => {
    return (
        <div className="admin-layout-container" style={{ display: 'flex' }}>
            <AdminSidebar />

            <Outlet />


        </div>
    );
};