import React from 'react';

const TimeSelection = ({ date, startTime, endTime, onDateChange, onStartTimeChange, onEndTimeChange }) => {
    return (
        <section className="card" style={{ marginBottom: '2rem' }}>
            <h2>1. Select Time</h2>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '200px' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Date</label>
                    <input
                        type="date"
                        value={date}
                        onChange={e => onDateChange(e.target.value)}
                        style={{ display: 'block', width: '100%', padding: '0.75rem' }}
                    />
                </div>
                <div style={{ flex: 1, minWidth: '150px' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Start Time</label>
                    <select
                        value={startTime}
                        onChange={e => onStartTimeChange(e.target.value)}
                        style={{ display: 'block', width: '100%', padding: '0.75rem' }}
                    >
                        {Array.from({ length: 15 }, (_, i) => i + 6).map(h => (
                            <option key={h} value={`${h.toString().padStart(2, '0')}:00`}>
                                {h}:00
                            </option>
                        ))}
                    </select>
                </div>
                <div style={{ flex: 1, minWidth: '150px' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>End Time</label>
                    <select
                        value={endTime}
                        onChange={e => onEndTimeChange(e.target.value)}
                        style={{ display: 'block', width: '100%', padding: '0.75rem' }}
                    >
                        {Array.from({ length: 15 }, (_, i) => i + 7).map(h => (
                            <option key={h} value={`${h.toString().padStart(2, '0')}:00`}>
                                {h}:00
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </section>
    );
};

export default TimeSelection;
