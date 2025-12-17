import React from 'react';

const CourtSelection = ({ courts, selectedCourtId, onSelect, loading }) => {
    return (
        <section className="card" style={{ marginBottom: '2rem' }}>
            <h2>2. Select Court</h2>
            {loading ? (
                <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>Checking availability...</div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
                    {courts.length === 0 ? (
                        <div style={{ color: 'var(--error)', padding: '1rem' }}>No courts available for this time slot.</div>
                    ) : courts.map(court => (
                        <div
                            key={court._id}
                            onClick={() => onSelect(court._id)}
                            style={{
                                border: `2px solid ${selectedCourtId === court._id ? 'var(--primary)' : 'var(--border)'}`,
                                padding: '1.5rem',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                backgroundColor: selectedCourtId === court._id ? '#EEF2FF' : 'white',
                                transition: 'all 0.2s'
                            }}
                        >
                            <div style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '0.5rem' }}>{court.name}</div>
                            <div style={{
                                display: 'inline-block',
                                padding: '0.25rem 0.5rem',
                                backgroundColor: court.type === 'indoor' ? '#DBEAFE' : '#D1FAE5',
                                color: court.type === 'indoor' ? '#1E40AF' : '#065F46',
                                borderRadius: '999px',
                                fontSize: '0.8rem',
                                textTransform: 'capitalize'
                            }}>
                                {court.type}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default CourtSelection;
