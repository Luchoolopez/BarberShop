import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Badge, Spinner, Alert } from 'react-bootstrap';
import { serviceService } from '../../services/service.service';
import type { Service } from '../../types/service.types';

export const AdminServices: React.FC = () => {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadServices = async () => {
        setLoading(true);
        try {
            const data = await serviceService.getAllServices();
            setServices(data);
        } catch (err) {
            setError('Error al cargar los servicios');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadServices();
    }, []);

    const handleDelete = async (id: number) => {
        if (!window.confirm('¿Estás seguro de desactivar este servicio?')) return;
        
        try {
            await serviceService.deleteService(id);
            loadServices(); 
        } catch (error) {
            alert('Error al eliminar');
        }
    };

    if (loading) return <Container className="mt-5 text-center"><Spinner animation="border" /></Container>;

    return (
        <Container className="my-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="h3">Gestión de Servicios</h1>
                <Button variant="primary">
                    + Nuevo Servicio
                </Button>
            </div>

            {error && <Alert variant="danger">{error}</Alert>}

            <div className="shadow-sm border rounded overflow-hidden">
                <Table hover responsive className="mb-0 bg-white">
                    <thead className="bg-light">
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Duración</th>
                            <th>Estado</th>
                            <th className="text-end">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {services.map((service) => (
                            <tr key={service.id}>
                                <td>#{service.id}</td>
                                <td className="fw-bold">{service.name}</td>
                                <td>${service.price}</td>
                                <td>{service.duration_minutes} min</td>
                                <td>
                                    <Badge bg={service.active ? 'success' : 'secondary'}>
                                        {service.active ? 'Activo' : 'Inactivo'}
                                    </Badge>
                                </td>
                                <td className="text-end">
                                    <Button variant="outline-primary" size="sm" className="me-2">
                                        Editar
                                    </Button>
                                    <Button 
                                        variant="outline-danger" 
                                        size="sm"
                                        onClick={() => handleDelete(service.id)}
                                        disabled={!service.active} 
                                    >
                                        Borrar
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </Container>
    );
};