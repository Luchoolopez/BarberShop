import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { FaPlus, FaLock } from 'react-icons/fa';
import type { Reward } from '../types/reward.types';

interface RewardCardProps {
    reward: Reward;
    userPoints: number;
    onRedeem: (reward: Reward) => void;
}

export const RewardCard: React.FC<RewardCardProps> = ({ reward, userPoints, onRedeem }) => {
    const canAfford = userPoints >= reward.points_cost;

    return (
        <Card className="h-100 shadow-sm border-2" style={{ borderRadius: '12px', transition: 'transform 0.2s' }}>
            <Card.Body className="d-flex align-items-center justify-content-between p-4">
                {/* Lado Izquierdo: Info */}
                <div className="d-flex flex-column justify-content-center">
                    <h6 className="fw-bold mb-1 text-dark" style={{ fontSize: '1.1rem' }}>
                        {reward.name}
                    </h6>
                    
                    <div className="text-muted small mb-3" style={{ lineHeight: '1.4', maxWidth: '200px' }}>
                        {reward.description}
                    </div>

                    <div className="d-flex align-items-center">
                        <span className={`fw-bold ${canAfford ? 'text-dark' : 'text-danger'}`} style={{ fontSize: '1.2rem' }}>
                            {reward.points_cost} pts
                        </span>
                        {!canAfford && (
                            <Badge bg="light" text="danger" className="ms-2 border border-danger">
                                Te faltan {reward.points_cost - userPoints}
                            </Badge>
                        )}
                    </div>
                </div>

                {/* Lado Derecho: Botón de Acción */}
                <div>
                    <Button 
                        variant={canAfford ? "light" : "secondary"}
                        className={`rounded px-3 py-2 d-flex align-items-center justify-content-center ${canAfford ? 'border' : ''}`}
                        style={{ height: '45px', width: '45px' }}
                        onClick={() => onRedeem(reward)}
                        disabled={!canAfford}
                        title={canAfford ? "Canjear Premio" : "Puntos insuficientes"}
                    >
                        {canAfford ? <FaPlus /> : <FaLock size={14} />}
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
};