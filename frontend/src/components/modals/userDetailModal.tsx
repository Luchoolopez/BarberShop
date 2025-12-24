import React from 'react';
import { Modal, Table, Button, Badge } from 'react-bootstrap';
// Ajusta la ruta de importación de tus tipos
import type { User } from '../../types/auth.types'; 
import { FaCheckCircle, FaClock } from 'react-icons/fa';

interface UserDetailModalProps {
    show: boolean;
    onHide: () => void;
    user: User | null; 
    // ESTA ES LA PROPIEDAD QUE TE FALTABA DEFINIR:
    onMarkAsUsed: (rewardId: number) => void; 
}

export const UserDetailModal: React.FC<UserDetailModalProps> = ({ show, onHide, user, onMarkAsUsed }) => {
    if (!user) return null;

    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Detalle de Usuario: {user.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* Datos del usuario */}
                <div className="row mb-4">
                    <div className="col-md-6">
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Teléfono:</strong> {user.phone || '-'}</p>
                    </div>
                    <div className="col-md-6 text-end">
                        <h4>Puntos: <Badge bg="warning" text="dark">{user.points_balance ?? 0}</Badge></h4>
                    </div>
                </div>

                <h5 className="mb-3 border-bottom pb-2">Premios Canjeados</h5>
                
                <div className="table-responsive">
                    <Table striped hover align="center">
                        <thead className="table-light">
                            <tr>
                                <th>Premio</th>
                                <th>Fecha Canje</th>
                                <th className="text-center">Estado</th>
                                <th className="text-end">Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {user.redeemedRewards && user.redeemedRewards.length > 0 ? (
                                user.redeemedRewards.map((item) => (
                                    <tr key={item.id}>
                                        <td>
                                            <strong>{item.reward?.name || 'Premio eliminado'}</strong>
                                            <br/>
                                            <small className="text-muted">Costo: {item.reward?.points_cost ?? 0} pts</small>
                                        </td>
                                        <td>
                                            {new Date(item.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="text-center">
                                            {item.is_used ? (
                                                <Badge bg="success">
                                                    <FaCheckCircle className="me-1"/> Usado
                                                </Badge>
                                            ) : (
                                                <Badge bg="warning" text="dark">
                                                    <FaClock className="me-1"/> Pendiente
                                                </Badge>
                                            )}
                                            {item.used_at && (
                                                <div style={{fontSize: '0.75rem'}} className="text-muted mt-1">
                                                    {new Date(item.used_at).toLocaleDateString()}
                                                </div>
                                            )}
                                        </td>
                                        <td className="text-end">
                                            <Button 
                                                variant={item.is_used ? "outline-secondary" : "success"}
                                                size="sm"
                                                disabled={item.is_used} 
                                                onClick={() => onMarkAsUsed(item.id)}
                                            >
                                                {item.is_used ? "Ya utilizado" : "Marcar como Usado"}
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="text-center py-4 text-muted">
                                        Este usuario aún no ha canjeado premios.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Cerrar</Button>
            </Modal.Footer>
        </Modal>
    );
};