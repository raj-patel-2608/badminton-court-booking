import React from 'react';

const CoachSelection = ({ coaches, selectedCoachId, onSelect }) => {
    return (
        <section className="card" style={{ marginBottom: '2rem' }}>
            <h2>4. Select Coach (Optional)</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
                <div
                    onClick={() => onSelect(null)}
                    style={{
                        border: `2px solid ${selectedCoachId === null ? 'var(--primary)' : 'var(--border)'}`,
                        padding: '1.5rem',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        textAlign: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: selectedCoachId === null ? '#EEF2FF' : 'white',
                        fontWeight: 500
                    }}
                >
                    No Coach
                </div>
                {coaches.map(coach => (
                    <div
                        key={coach._id}
                        onClick={() => onSelect(coach._id)}
                        style={{
                            border: `2px solid ${selectedCoachId === coach._id ? 'var(--primary)' : 'var(--border)'}`,
                            padding: '1.5rem',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            backgroundColor: selectedCoachId === coach._id ? '#EEF2FF' : 'white',
                            transition: 'all 0.2s'
                        }}
                    >
                        <div style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '0.5rem' }}>{coach.name}</div>
                        <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Level: {coach.level}</div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--primary)', marginTop: '0.5rem' }}>₹{coach.feePerHour}/hr</div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CoachSelection;
