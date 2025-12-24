import React, { useState } from 'react';
import { Container, Table, Spinner, Alert, Button, Badge } from 'react-bootstrap';
import { useRewards } from '../../hooks/useReward';
import { RewardFormModal } from '../../components/modals/RewardFormModal';
import { FaGift, FaPencilAlt, FaTrash } from "react-icons/fa"; 

export const AdminRewards: React.FC = () => {
    const { rewards, loading, error, createReward, updateReward, deleteReward } = useRewards();
    const [showFormModal, setShowFormModal] = useState(false);
    const [selectedReward, setSelectedReward] = useState<any | null>(null);

    const handleCreate = () => { 
        setSelectedReward(null); 
        setShowFormModal(true); 
    };

    const handleEdit = (r: any) => { 
        setSelectedReward(r); 
        setShowFormModal(true); 
    };
    
    const handleDelete = async (r: any) => {
        if (window.confirm(`¿Estás seguro de eliminar el premio "${r.name}"?`)) {
            await deleteReward(r.id);
        }
    };

    const handleSave = async (data: any) => {
        if (selectedReward) await updateReward(selectedReward.id, data);
        else await createReward(data);
        setShowFormModal(false);
    };

    if (loading) return <div className="text-center py-5"><Spinner animation="border" /></div>;
    if (error) return <Alert variant="danger">{error}</Alert>;

    return (
        <Container className="py-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="mb-0"><FaGift className="me-2 text-primary"/>Gestión de Premios</h2>
                <Button variant="primary" onClick={handleCreate}>+ Nuevo Premio</Button>
            </div>

            <div className="table-responsive shadow-sm rounded">
                <Table hover striped bordered className="mb-0 bg-white align-middle">
                    <thead className="table-light">
                        <tr>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th className="text-center">Costo Puntos</th>
                            <th className="text-center">Estado</th>
                            <th className="text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rewards.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="text-center py-4 text-muted">No hay premios activos.</td>
                            </tr>
                        ) : (
                            rewards.map((r) => (
                                <tr key={r.id}>
                                    <td className="fw-bold">{r.name}</td>
                                    <td className="text-muted small">{r.description}</td>
                                    <td className="text-center">
                                        <Badge bg="warning" text="dark">{r.points_cost} pts</Badge>
                                    </td>
                                    <td className="text-center">
                                        <Badge bg={r.active ? 'success' : 'secondary'}>{r.active ? 'Activo' : 'Inactivo'}</Badge>
                                    </td>
                                    <td className="text-center">
                                        <Button variant="outline-primary" size="sm" className="me-2" onClick={() => handleEdit(r)}>
                                            <FaPencilAlt />
                                        </Button>
                                        <Button variant="outline-danger" size="sm" onClick={() => handleDelete(r)}>
                                            <FaTrash />
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </Table>
            </div>

            <RewardFormModal 
                show={showFormModal} 
                onHide={() => setShowFormModal(false)}
                onSubmit={handleSave}
                initialData={selectedReward}
            />
        </Container>
    );
};