import { Outlet } from 'react-router-dom';
import { AdminSidebar } from '../components/admin/AdminSidebar';

export const AdminLayout = () => {
    return (
        <div className="d-flex flex-column flex-md-row min-vh-100 bg-light">
            
            <AdminSidebar />

            <main className="flex-grow-1 p-3 overflow-auto" style={{ height: '100vh' }}>
                <Outlet />
            </main>
        </div>
    );
};