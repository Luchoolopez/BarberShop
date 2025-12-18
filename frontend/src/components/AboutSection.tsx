import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

export const AboutSection: React.FC = () => {
  return (
    <Container className="informacion my-5">
      <Row>
        <Col md={6} className="descripcion">
            <p id="titulo_descripcion_primero">DESPEGAR EN EL VIAJE DE LA</p>
            <h1 id="titulo_descripcion_segundo">PASIÓN</h1>
            <p>Todos los días buscamos un momento en que el corazón traspase nuestro cuerpo...</p>
            <p>“Creativo de raza” es como alguna vez me llamo una clienta...</p>
        </Col>
        <Col md={6} className="fotos_body d-flex gap-2">
            <img src="/images/foto_1.jpeg" alt="Trabajo 1" className="img-fluid w-50" />
            <img src="/images/foto_2.jpeg" alt="Trabajo 2" className="img-fluid w-50" />
        </Col>
      </Row>
    </Container>
  );
};