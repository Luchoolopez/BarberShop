import React from 'react';
import { Container, Row, Col, ListGroup, Card, Spinner, Alert, Badge } from 'react-bootstrap';
import { useService } from '../hooks/useService';

export const PricingList: React.FC = () => {
  const { service, loading, error } = useService(true);

  if (loading) return (
    <div className="py-5 text-center bg-body-tertiary">
        <Spinner animation="border" variant="primary" />
    </div>
  );

  if (error) return (
    <div className="py-5 bg-body-tertiary">
        <Container><Alert variant="danger">{error}</Alert></Container>
    </div>
  );

  return (
    <section className="py-5 bg-black border-top">
      <Container>
        <Row className="align-items-start g-5">
          <Col lg={5} className="text-center text-lg-start" style={{ top: '2rem' }}>
            <h2 className="display-4 fw-bold mb-3 text-white">NUESTROS PRECIOS</h2>
            <p className="lead text-white-50 mb-4">
              Calidad premium al mejor precio. <br />
              Diseñados exclusivamente para tu estilo en Bahía Blanca.
            </p>
            
            <div className="d-inline-block bg-white p-3 rounded shadow-sm border">
                <p className="mb-0 fw-bold text-success">
                    <i className="bi bi-cash-coin me-2"></i>
                    10% OFF en pagos en efectivo
                </p>
            </div>
          </Col>

          <Col lg={7}>
            {service.length === 0 ? (
                <Alert variant="info">No hay servicios disponibles por el momento.</Alert>
            ) : (
                <Card className="border-0 shadow-sm overflow-hidden">
                    <ListGroup variant="flush">
                        {service.map((service) => (
                            <ListGroup.Item 
                                key={service.id} 
                                className="d-flex justify-content-between align-items-center py-4 px-4 bg-white"
                            >
                                <div className="me-3">
                                    <div className="d-flex align-items-center gap-2 mb-1">
                                        <h5 className="mb-0 fw-bold text-dark">
                                            {service.name}
                                        </h5>
                                    </div>
                                    <div className="text-muted small">
                                        <i className="bi bi-clock me-1"></i>
                                        {service.duration_minutes} mins
                                        {service.description && (
                                            <span className="d-none d-md-inline"> • {service.description}</span>
                                        )}
                                    </div>
                                </div>

                                <div className="text-end">
                                    <span className="fs-4 fw-bold text-primary">
                                        ${service.price}
                                    </span>
                                </div>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Card>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
};