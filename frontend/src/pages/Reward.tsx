import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Alert, Spinner, Modal, Button } from 'react-bootstrap';
import { FaStar, FaGift } from 'react-icons/fa';
import { RewardCard } from '../components/RewardCard';
import { rewardService } from '../services/reward.service';
import { authService } from '../services/auth.service';
import type { Reward } from '../types/reward.types';
import type { User } from '../types/auth.types';

export const RewardClient: React.FC = () => {
    const [rewards, setRewards] = useState<Reward[]>([]);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [successMsg, setSuccessMsg] = useState<string | null>(null);

    // Estado para el modal de confirmación
    const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [redeemLoading, setRedeemLoading] = useState(false);

    // Cargar datos
    const loadData = async () => {
        try {
            setLoading(true);
            const [rewardsData, userData] = await Promise.all([
                rewardService.getActiveRewards(),
                authService.checkAuth() 
            ]);
            setRewards(rewardsData);
            setUser(userData);
        } catch (e) {
            console.error(e);
            setError("No se pudieron cargar los premios.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleRedeemClick = (reward: Reward) => {
        setSelectedReward(reward);
        setShowModal(true);
    };

    const confirmRedeem = async () => {
        if (!selectedReward) return;
        setRedeemLoading(true);
        try {
            await rewardService.redeemReward(selectedReward.id);
            setSuccessMsg(`¡Felicitaciones! Canjeaste "${selectedReward.name}" correctamente.`);
            setShowModal(false);
            await loadData();
        } catch (e: any) {
            alert(e.response?.data?.message || "Error al canjear el premio.");
        } finally {
            setRedeemLoading(false);
        }
    };

    if (loading) return <div className="text-center py-5"><Spinner animation="border" variant="primary"/></div>;

    return (
        <Container className="py-5">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-5 bg-black text-white p-4 rounded shadow-sm">
                <div>
                    <h2 className="fw-bold mb-1">Catálogo de Premios</h2>
                    <p className="mb-0 opacity-75">Canjeá tus puntos por servicios exclusivos.</p>
                </div>
                <div className="mt-3 mt-md-0 text-center bg-white text-black px-4 py-2 rounded-pill shadow-sm">
                    <small className="fw-bold text-uppercase ls-1">Mis Puntos</small>
                    <div className="display-6 fw-bold d-flex align-items-center justify-content-center gap-2">
                        <FaStar className="text-warning" size={32}/> 
                        {user?.points_balance || 0}
                    </div>
                </div>
            </div>

            {error && <Alert variant="danger">{error}</Alert>}
            {successMsg && <Alert variant="success" dismissible onClose={() => setSuccessMsg(null)}>{successMsg}</Alert>}

            <Row className="g-4">
                {rewards.length === 0 ? (
                    <Col xs={12} className="text-center py-5 text-muted">
                        <FaGift size={40} className="mb-3 opacity-50"/>
                        <p>No hay premios disponibles en este momento.</p>
                    </Col>
                ) : (
                    rewards.map(reward => (
                        <Col md={6} lg={4} key={reward.id}>
                            <RewardCard 
                                reward={reward} 
                                userPoints={user?.points_balance || 0}
                                onRedeem={handleRedeemClick}
                            />
                        </Col>
                    ))
                )}
            </Row>

            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Canje</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ¿Estás seguro que deseas canjear <strong>{selectedReward?.name}</strong> por <strong className="text-primary">{selectedReward?.points_cost} puntos</strong>?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Button>
                    <Button variant="primary" onClick={confirmRedeem} disabled={redeemLoading}>
                        {redeemLoading ? <Spinner size="sm" animation="border"/> : 'Confirmar Canje'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};