import React from 'react';

const BookingSummary = ({ date, startTime, endTime, pricePreview, onConfirm, canConfirm, loading }) => {
    return (
        <div className="card" style={{ position: 'sticky', top: '1rem', height: 'fit-content' }}>
            <h2 style={{ marginBottom: '1.5rem' }}>Booking Summary</h2>

            <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Date</span>
                    <strong>{date}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Time</span>
                    <strong>{startTime} - {endTime}</strong>
                </div>
            </div>

            <hr style={{ margin: '1.5rem 0', borderColor: 'var(--border)' }} />

            {pricePreview ? (
                <div className="price-breakdown">
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                        <span>Base Price</span>
                        <span>₹{pricePreview.basePrice}</span>
                    </div>
                    {pricePreview.modifiers.map((mod, idx) => (
                        <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                            <span>{mod.name}</span>
                            <span style={{ color: 'var(--secondary)' }}>+₹{mod.amount}</span>
                        </div>
                    ))}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontWeight: 'bold',
                        fontSize: '1.25rem',
                        marginTop: '1.5rem',
                        borderTop: '2px dashed var(--border)',
                        paddingTop: '1.5rem'
                    }}>
                        <span>Total</span>
                        <span style={{ color: 'var(--primary)' }}>₹{pricePreview.totalPrice}</span>
                    </div>
                </div>
            ) : (
                <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontStyle: 'italic', padding: '1rem 0' }}>
                    Select a court to see pricing
                </div>
            )}

            <button
                className="btn btn-primary"
                style={{ width: '100%', padding: '1rem', marginTop: '1.5rem', fontSize: '1.1rem' }}
                onClick={onConfirm}
                disabled={!canConfirm || loading}
            >
                {loading ? 'Processing...' : 'Confirm Booking'}
            </button>
        </div>
    );
};

export default BookingSummary;
