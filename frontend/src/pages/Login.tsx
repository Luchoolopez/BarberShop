import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Container, Row, Col, Form, Button, Breadcrumb, InputGroup, Alert } from "react-bootstrap";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import { useAuthContext } from '../context/AuthContext';
import type { LoginDTO } from "../types/auth.types";

export const Login: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    
    const location = useLocation();
    const [successMessage, setSuccessMessage] = useState<string | null>(location.state?.successMessage || null);

    const { login, loading, error: authError, setError } = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.state?.successMessage) {
            window.history.replaceState({}, document.title);
            const timer = setTimeout(() => {
                setSuccessMessage(null);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [location.state]);

    useEffect(() => {
        return () => { setError(null); }
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const values: LoginDTO = { email, password };

        try {
            await login(values);
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Container className="my-5">
            <Row className="mb-4">
                <Col>
                    <Breadcrumb>
                        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>Inicio</Breadcrumb.Item>
                        <Breadcrumb.Item active>Login</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>

            <Row className="justify-content-md-center">
                <Col md={6} lg={5}>
                    {successMessage && (
                        <Alert 
                            variant="success" 
                            onClose={() => setSuccessMessage(null)} 
                            dismissible
                            className="mb-4 shadow-sm"
                        >
                            {successMessage}
                        </Alert>
                    )}

                    <div className="bg-white p-4 p-md-5 rounded shadow-sm border">
                        <h2 className="text-center mb-4 fw-bold">Iniciar sesión</h2>

                        {authError && (
                            <Alert variant="danger" onClose={() => setError(null)} dismissible>
                                {authError}
                            </Alert>
                        )}

                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="loginEmail">
                                <Form.Label className="small text-muted fw-bold">EMAIL</Form.Label>
                                <Form.Control 
                                    type="email" 
                                    placeholder="ejemplo@correo.com"
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    required 
                                    autoFocus
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="loginPassword">
                                <Form.Label className="small text-muted fw-bold">CONTRASEÑA</Form.Label>
                                <InputGroup>
                                    <Form.Control 
                                        type={showPassword ? "text" : "password"} 
                                        value={password} 
                                        onChange={(e) => setPassword(e.target.value)} 
                                        required 
                                    />
                                    <Button 
                                        variant="outline-secondary" 
                                        onClick={() => setShowPassword(!showPassword)}
                                        tabIndex={-1}
                                    >
                                        {showPassword ? <EyeSlash size={18}/> : <Eye size={18}/>}
                                    </Button>
                                </InputGroup>
                            </Form.Group>

                            <div className="text-end mb-4">
                                <Link to="/forgot-password" style={{ fontSize: '0.9rem', textDecoration: 'none' }}>
                                    ¿Olvidaste tu contraseña?
                                </Link>
                            </div>

                            <Button 
                                variant="dark" 
                                type="submit" 
                                className="w-100 py-2 fw-bold" 
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                        Cargando...
                                    </>
                                ) : "INICIAR SESIÓN"}
                            </Button>
                        </Form>

                        <p className="text-center mt-4 mb-0 text-muted" style={{ fontSize: '0.95rem' }}>
                            ¿No tenés cuenta aún? <br/>
                            <Link to="/register" className="fw-bold text-dark" style={{ textDecoration: 'none' }}>
                                Crear cuenta
                            </Link>
                        </p>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;