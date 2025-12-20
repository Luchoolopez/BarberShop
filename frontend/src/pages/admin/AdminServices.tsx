import React, { useState } from 'react';
import { Container, Table, Spinner, Alert, Button, Badge } from 'react-bootstrap';
import { useService } from '../../hooks/useService';

import { ServiceFormModal, type ServiceFormData } from '../../components/modals/ServiceFormModal';
import { ServiceDeleteModal } from '../../components/modals/ServiceDeleteModal';

// Iconos
import { FaPencilAlt, FaEye, FaEyeSlash } from "react-icons/fa"; 
import { MdCancel, MdRestore } from "react-icons/md"; 

export const AdminServices: React.FC = () => {
  const { service, loading, error, createService, updateService, deleteService } = useService(false);

  const [showFormModal, setShowFormModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedService, setSelectedService] = useState<any | null>(null);

  const [showInactive, setShowInactive] = useState(false);

  const filteredServices = service.filter(item => 
      showInactive ? !item.active : item.active
  );

  const handleCreate = () => {
      setSelectedService(null); 
      setShowFormModal(true);
  };

  const handleEdit = (item: any) => {
      setSelectedService(item); 
      setShowFormModal(true);
  };

  const handleDeleteRequest = (item: any) => {
      setSelectedService(item);
      setShowDeleteModal(true);
  };

  const handleActivate = async (item: any) => {
      try {
           await updateService(item.id, { ...item, active: true, price: String(item.price) });
      } catch (e) { console.error(e); }
  };

  const handleSaveForm = async (formData: ServiceFormData) => {
      const payload = {
          name: formData.name,
          description: formData.description,
          duration_minutes: Number(formData.duration_minutes),
          points_reward: Number(formData.points_reward), 
          price: String(formData.price),
          active: true 
      };

      try {
          if (selectedService && selectedService.id) {
              await updateService(selectedService.id, payload);
          } else {
              await createService(payload);
          }
          setShowFormModal(false);
      } catch (e) {
          console.error("Error al guardar:", e);
      }
  };

  const handleConfirmDelete = async () => {
      if (selectedService && selectedService.id) {
          await deleteService(selectedService.id);
      }
      setShowDeleteModal(false);
  };

  if (loading) return <div className="text-center py-5"><Spinner animation="border" /></div>;
  if (error) return <Alert variant="danger" className="m-3">{error}</Alert>;

  return (
    <Container className="py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="d-flex align-items-center gap-3">
                <h2 className="mb-0">
                    {showInactive ? 'Servicios Desactivados' : 'Servicios'}
                </h2>
            </div>

            <div className="d-flex gap-2">
                <Button 
                    variant="outline-secondary" 
                    onClick={() => setShowInactive(!showInactive)}
                >
                    {showInactive ? (
                        <><FaEye className="me-2" /> Ver Activos</>
                    ) : (
                        <><FaEyeSlash className="me-2" /> Ver Desactivados</>
                    )}
                </Button>

                {!showInactive && (
                    <Button variant="primary" onClick={handleCreate}>
                        <i className="bi bi-plus-lg me-2"></i>Nuevo Servicio
                    </Button>
                )}
            </div>
        </div>

        <div className="table-responsive shadow-sm rounded">
            <Table hover striped bordered className="mb-0 bg-white align-middle">
                <thead className="table-light">
                    <tr>
                        <th>Servicio</th>
                        <th>Descripción</th>
                        <th className="text-center">Duración</th>
                        <th className="text-center">Puntos</th>
                        <th className="text-end">Precio</th>
                        <th className="text-center" style={{ width: '120px' }}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredServices.length === 0 ? (
                        <tr>
                            <td colSpan={6} className="text-center py-4 text-muted">
                                {showInactive 
                                    ? "No hay servicios desactivados." 
                                    : "No hay servicios activos."}
                            </td>
                        </tr>
                    ) : (
                        filteredServices.map((item) => (
                            <tr key={item.id} style={{ opacity: showInactive ? 0.7 : 1 }}>
                                <td className="fw-bold">{item.name}</td>
                                <td className="text-muted small">
                                    {item.description || '-'}
                                </td>
                                <td className="text-center">
                                    <Badge bg="secondary" text="light" pill>
                                        {item.duration_minutes} min
                                    </Badge>
                                </td>
                                <td className="text-center">
                                    {item.points_reward > 0 ? (
                                        <span className="text-success fw-bold">+{item.points_reward}</span>
                                    ) : (
                                        <span className="text-muted">-</span>
                                    )}
                                </td>
                                <td className="text-end fw-bold">
                                    ${item.price}
                                </td>
                                <td className="text-center">
                                    <div className="d-flex justify-content-center gap-2">
                                        {showInactive ? (
                                            <Button variant="outline-success" size="sm" onClick={() => handleActivate(item)} title="Reactivar">
                                                <MdRestore size={18} />
                                            </Button>
                                        ) : (
                                            <>
                                                <Button variant="outline-primary" size="sm" onClick={() => handleEdit(item)} title="Editar">
                                                    <FaPencilAlt />
                                                </Button>
                                                <Button variant="outline-danger" size="sm" onClick={() => handleDeleteRequest(item)} title="Eliminar">
                                                    <MdCancel size={18} />
                                                </Button>
                                            </>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </Table>
        </div>

        <ServiceFormModal 
            show={showFormModal} 
            onHide={() => setShowFormModal(false)}
            onSubmit={handleSaveForm}
            initialData={selectedService}
        />

        <ServiceDeleteModal
            show={showDeleteModal}
            onHide={() => setShowDeleteModal(false)}
            onConfirm={handleConfirmDelete}
            serviceName={selectedService?.name || ''}
        />
    </Container>
  );
};