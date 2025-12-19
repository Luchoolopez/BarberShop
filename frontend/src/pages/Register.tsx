import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, Alert, Breadcrumb } from "react-bootstrap";
import { useAuthContext } from '../context/AuthContext';
import type { RegisterDTO } from "../types/auth.types";

export const Register = () => {
    const [values, setValues] = useState<RegisterDTO>({
        name: "",
        email: "",
        phone: "",
        password: "",
    });

    // Consumimos Auth
    const { register, loading, error, setError } = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        return () => { setError(null); }
    }, []);

    const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await register(values);
            navigate('/login', { 
                state: { successMessage: '¡Cuenta creada con éxito! Por favor iniciá sesión.' } 
            });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Container className="my-5">
            <Row className="mb-4">
                <Col>
                    <Breadcrumb>
                        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>Inicio</Breadcrumb.Item>
                        <Breadcrumb.Item active>Registro</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>

            <Row className="justify-content-md-center">
                <Col md={6} lg={5}>
                    <div className="p-4 p-md-5 rounded shadow-sm border bg-body-tertiary">
                        <h2 className="text-center mb-4 fw-bold">Crear cuenta</h2>
                        
                        {error && <Alert variant="danger" onClose={() => setError(null)} dismissible>{error}</Alert>}

                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="registerName">
                                <Form.Label className="small text-muted fw-bold">NOMBRE COMPLETO</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Tu nombre completo" 
                                    name="name" 
                                    value={values.name}
                                    onChange={handleChanges} 
                                    required 
                                    autoFocus
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="registerPhone">
                                <Form.Label className="small text-muted fw-bold">TELÉFONO</Form.Label>
                                <Form.Control 
                                    type="tel" 
                                    placeholder="Ej: 11 1234 5678" 
                                    name="phone" 
                                    value={values.phone}
                                    onChange={handleChanges} 
                                    required 
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="registerEmail">
                                <Form.Label className="small text-muted fw-bold">EMAIL</Form.Label>
                                <Form.Control 
                                    type="email" 
                                    placeholder="ejemplo@correo.com" 
                                    name="email" 
                                    value={values.email}
                                    onChange={handleChanges} 
                                    required 
                                />
                            </Form.Group>

                            <Form.Group className="mb-4" controlId="registerPassword">
                                <Form.Label className="small text-muted fw-bold">CONTRASEÑA</Form.Label>
                                <Form.Control 
                                    type="password" 
                                    placeholder="Mínimo 6 caracteres" 
                                    name="password" 
                                    value={values.password}
                                    onChange={handleChanges} 
                                    required 
                                />
                            </Form.Group>

                            <Button 
                                variant="dark" 
                                type="submit" 
                                className="w-100 py-2 fw-bold" 
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                        Creando cuenta...
                                    </>
                                ) : "CREAR CUENTA"}
                            </Button>
                        </Form>
                        
                        <p className="text-center mt-4 mb-0 text-muted" style={{ fontSize: '0.95rem' }}>
                            ¿Ya tenés cuenta? <br/>
                            <Link 
                                to="/login" 
                                className="fw-bold link-body-emphasis"
                                style={{ textDecoration: 'none' }}
                            >
                                Iniciar sesión
                            </Link>
                        </p>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Register;