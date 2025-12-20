import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

export const AboutSection: React.FC = () => {
  return (
    <Container className="informacion my-5">
      <Row>
        <Col md={6} className="descripcion ">
            <p id="titulo_descripcion_primero">DESPEGAR EN EL VIAJE DE LA</p>
            <h1 id="titulo_descripcion_segundo">PASIÓN</h1>
            <p>Todos los días buscamos un momento en que el corazón traspase nuestro cuerpo...</p>
            <p>“Creativo de raza” es como alguna vez me llamo una clienta...</p>
        </Col>
      </Row>
    </Container>
  );
};