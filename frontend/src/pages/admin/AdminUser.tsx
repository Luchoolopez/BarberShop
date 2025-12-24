import React, { useState } from 'react';
import { Container, Table, Spinner, Alert, Button, Badge, Pagination } from 'react-bootstrap';
import { FaEye, FaUserShield } from "react-icons/fa"; 
import { useUsers } from '../../hooks/useUser';
import { UserDetailModal } from '../../components/modals/userDetailModal';

export const AdminUsers: React.FC = () => {
    const { 
        users, 
        pagination, 
        loading, 
        error, 
        selectedUser, 
        setSelectedUser,
        fetchUsers, 
        fetchUserDetail, 
        promoteUser,
        markRewardAsUsed 
    } = useUsers();

    const [showDetailModal, setShowDetailModal] = useState(false);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= pagination.totalPages) {
            fetchUsers(page);
        }
    };

    const handleViewDetails = async (id: number) => {
        await fetchUserDetail(id);
        setShowDetailModal(true);
    };

    const handleCloseModal = () => {
        setShowDetailModal(false);
        setSelectedUser(null); 
    };

    const handlePromote = async (id: number, name: string) => {
        if (!window.confirm(`¿Estás seguro de hacer ADMIN a ${name}?`)) return;
        try {
            await promoteUser(id);
        } catch (e: any) {
            alert(e.message || "Error al promover usuario");
        }
    };

    const handleMarkReward = async (rewardId: number) => {
        if(!window.confirm("¿Confirmar que el cliente está usando este premio ahora?")) return;
        try {
            await markRewardAsUsed(rewardId);
        } catch (e: any) {
            alert(e.message || "Error al canjear premio");
        }
    }

    if (loading && users.length === 0) return <div className="text-center py-5"><Spinner animation="border" /></div>;
    if (error) return <Alert variant="danger" className="m-3">{error}</Alert>;

    return (
        <Container className="py-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="mb-0">Usuarios Registrados</h2>
            </div>

            <div className="table-responsive shadow-sm rounded">
                <Table hover striped bordered className="mb-0 bg-white align-middle">
                    <thead className="table-light">
                        <tr>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th className="text-center">Rol</th>
                            <th className="text-center">Puntos</th>
                            <th className="text-center" style={{ width: '150px' }}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length === 0 ? (
                             <tr>
                                <td colSpan={5} className="text-center py-4">No se encontraron usuarios.</td>
                             </tr>
                        ) : (
                            users.map((user) => (
                                <tr key={user.id}>
                                    <td className="fw-bold">{user.name}</td>
                                    <td>{user.email}</td>
                                    <td className="text-center">
                                        <Badge bg={user.role === 'admin' ? 'primary' : 'info'}>
                                            {user.role}
                                        </Badge>
                                    </td>
                                    <td className="text-center">
                                        <span className="fw-bold text-warning">{user.points_balance ?? 0} pts</span>
                                    </td>
                                    <td className="text-center">
                                        <div className="d-flex justify-content-center gap-2">
                                            <Button 
                                                variant="outline-primary" 
                                                size="sm" 
                                                onClick={() => handleViewDetails(user.id)} 
                                                title="Ver Detalle y Premios"
                                            >
                                                <FaEye />
                                            </Button>
                                            
                                            {user.role !== 'admin' && (
                                                <Button 
                                                    variant="outline-dark" 
                                                    size="sm" 
                                                    onClick={() => handlePromote(user.id, user.name)}
                                                    title="Hacer Admin"
                                                >
                                                    <FaUserShield />
                                                </Button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </Table>
            </div>

            {pagination.totalPages > 1 && (
                <div className="d-flex justify-content-center mt-4">
                    <Pagination>
                        <Pagination.First 
                            onClick={() => handlePageChange(1)} 
                            disabled={pagination.currentPage === 1}
                        />
                        <Pagination.Prev 
                            onClick={() => handlePageChange(pagination.currentPage - 1)} 
                            disabled={pagination.currentPage === 1}
                        />
                        
                        <Pagination.Item active>{pagination.currentPage}</Pagination.Item>
                        
                        <Pagination.Next 
                            onClick={() => handlePageChange(pagination.currentPage + 1)} 
                            disabled={pagination.currentPage === pagination.totalPages}
                        />
                        <Pagination.Last 
                            onClick={() => handlePageChange(pagination.totalPages)} 
                            disabled={pagination.currentPage === pagination.totalPages}
                        />
                    </Pagination>
                </div>
            )}

            <UserDetailModal 
                show={showDetailModal}
                onHide={handleCloseModal}
                user={selectedUser}
                onMarkAsUsed={handleMarkReward}
            />
        </Container>
    );
};