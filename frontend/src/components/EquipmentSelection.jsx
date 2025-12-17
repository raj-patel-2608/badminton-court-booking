import React from 'react';

const EquipmentSelection = ({ equipment, selectedEquipment, onChange }) => {
    return (
        <section className="card" style={{ marginBottom: '2rem' }}>
            <h2>3. Add Equipment (Optional)</h2>
            <div style={{ marginTop: '1rem', display: 'grid', gap: '1rem' }}>
                {equipment.map(eq => {
                    const currentQty = selectedEquipment.find(e => e.id === eq._id)?.quantity || 0;
                    return (
                        <div key={eq._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', border: '1px solid var(--border)', borderRadius: '8px', backgroundColor: 'var(--background)' }}>
                            <div>
                                <strong style={{ fontSize: '1.1rem' }}>{eq.name}</strong>
                                <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                                    {eq.availableQuantity} available
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', backgroundColor: 'white', padding: '0.25rem', borderRadius: '8px', border: '1px solid var(--border)' }}>
                                <button
                                    className="btn"
                                    style={{ width: '32px', height: '32px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                    onClick={() => onChange(eq._id, currentQty - 1, eq.availableQuantity)}
                                    disabled={currentQty <= 0}
                                >-</button>
                                <span style={{ minWidth: '20px', textAlign: 'center', fontWeight: 'bold' }}>{currentQty}</span>
                                <button
                                    className="btn"
                                    style={{ width: '32px', height: '32px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                    onClick={() => onChange(eq._id, currentQty + 1, eq.availableQuantity)}
                                    disabled={currentQty >= eq.availableQuantity}
                                >+</button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default EquipmentSelection;
