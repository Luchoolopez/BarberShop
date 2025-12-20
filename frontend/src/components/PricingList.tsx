import React from 'react';
import { Container } from 'react-bootstrap';

const precios = [
    { label: "Corte de pelo", precio: "$5.000" },
    { label: "Corte de pelo + barba", precio: "$7.000" },
    { label: "Teñirse", precio: "$15.000" },
];

export const PricingList: React.FC = () => {
  return (
    <div className="descripcion_precios py-5 bg-body-tertiary">
      <Container className="d-flex justify-content-between align-items-center">
        <div className="descripcion_precios_informacion">
            <h1>PRECIOS</h1>
            <p>Los precios del corte son aplicados únicamente a Bahía Blanca</p>
            <p className="text-muted">10% OFF en pagos contado/efectivo</p>
        </div>

        <div className="descripcion_precios_listado">
            {precios.map((item, index) => (
                <div key={index} className="precio-item h4">
                    {item.label}: <span className="fw-bold">{item.precio}</span>
                </div>
            ))}
        </div>
      </Container>
    </div>
  );
};