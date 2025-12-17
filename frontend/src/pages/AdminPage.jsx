import React, { useState, useEffect } from 'react';
import { adminService } from '../services/api';

const AdminPage = () => {
    const [activeTab, setActiveTab] = useState('courts');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchData();
    }, [activeTab]);

    const fetchData = async () => {
        setLoading(true);
        try {
            let res;
            if (activeTab === 'courts') res = await adminService.getCourts();
            else if (activeTab === 'pricing') res = await adminService.getPricingRules();
            else if (activeTab === 'equipment') res = await adminService.getEquipment();
            else if (activeTab === 'coaches') res = await adminService.getCoaches();

            setData(res.data);
        } catch (err) {
            console.error(err);
            alert("Failed to fetch data");
        } finally {
            setLoading(false);
        }
    };

    const toggleActive = async (item) => {
        try {
            const field = 'isActive' in item ? 'isActive' : null;
            if (!field) return;

            const newItem = { ...item, [field]: !item[field] };

            if (activeTab === 'courts') await adminService.updateCourt(item._id, newItem);
            else if (activeTab === 'pricing') await adminService.updatePricingRule(item._id, newItem);
            // Equipment and Coaches might not have isActive or use different logic, handling courts/pricing for now

            fetchData();
        } catch (err) {
            alert("Update failed");
        }
    };

    return (
        <div className="admin-page">
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
                {['courts', 'pricing', 'equipment', 'coaches'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        style={{
                            background: 'none',
                            border: 'none',
                            borderBottom: activeTab === tab ? '2px solid var(--primary)' : 'none',
                            fontWeight: activeTab === tab ? 'bold' : 'normal',
                            color: activeTab === tab ? 'var(--primary)' : 'var(--text-muted)',
                            padding: '0.5rem 1rem',
                            textTransform: 'capitalize',
                            cursor: 'pointer'
                        }}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {loading ? <p>Loading...</p> : (
                <div className="card">
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ background: '#f9fafb', textAlign: 'left' }}>
                                <th style={{ padding: '0.75rem' }}>ID</th>
                                <th style={{ padding: '0.75rem' }}>Name</th>
                                <th style={{ padding: '0.75rem' }}>Details</th>
                                <th style={{ padding: '0.75rem' }}>Status</th>
                                <th style={{ padding: '0.75rem' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(item => (
                                <tr key={item._id} style={{ borderTop: '1px solid var(--border)' }}>
                                    <td style={{ padding: '0.75rem', fontFamily: 'monospace', fontSize: '0.85rem' }}>{item._id.substring(item._id.length - 6)}</td>
                                    <td style={{ padding: '0.75rem', fontWeight: 500 }}>{item.name}</td>
                                    <td style={{ padding: '0.75rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                                        {activeTab === 'courts' && `Type: ${item.type} | Rate: ₹${item.pricePerHour}/hr`}
                                        {activeTab === 'pricing' && `${item.type.toUpperCase()} - ${item.modifierType === 'percent' ? item.modifierValue + '%' : '₹' + item.modifierValue}`}
                                        {activeTab === 'equipment' && `Qty: ${item.totalQuantity}`}
                                        {activeTab === 'coaches' && `Level: ${item.level}`}
                                    </td>
                                    <td style={{ padding: '0.75rem' }}>
                                        {'isActive' in item ? (
                                            <span style={{
                                                padding: '0.25rem 0.5rem',
                                                borderRadius: '99px',
                                                fontSize: '0.8rem',
                                                backgroundColor: item.isActive ? '#D1FAE5' : '#FEE2E2',
                                                color: item.isActive ? '#065F46' : '#991B1B'
                                            }}>
                                                {item.isActive ? 'Active' : 'Inactive'}
                                            </span>
                                        ) : '-'}
                                    </td>
                                    <td style={{ padding: '0.75rem' }}>
                                        {'isActive' in item && (
                                            <button
                                                className="btn btn-outline"
                                                style={{ fontSize: '0.8rem', padding: '0.25rem 0.5rem' }}
                                                onClick={() => toggleActive(item)}
                                            >
                                                Toggle
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AdminPage;
