import React, { useState, useEffect } from 'react';
import { availabilityService, pricingService, bookingService } from '../services/api';
import { format } from 'date-fns';
import CourtSelection from '../components/CourtSelection';
import TimeSelection from '../components/TimeSelection';
import EquipmentSelection from '../components/EquipmentSelection';
import CoachSelection from '../components/CoachSelection';
import BookingSummary from '../components/BookingSummary';

const BookingPage = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        date: format(new Date(), 'yyyy-MM-dd'),
        startTime: '18:00',
        endTime: '19:00',
        courtId: null,
        coachId: null,
        equipment: [] // Array of { id, quantity }
    });

    const [availableCourts, setAvailableCourts] = useState([]);
    const [availableCoaches, setAvailableCoaches] = useState([]);
    const [availableEquipment, setAvailableEquipment] = useState([]);
    const [pricePreview, setPricePreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch availability when time/date changes
    useEffect(() => {
        if (formData.date && formData.startTime && formData.endTime) {
            checkAvailability();
        }
    }, [formData.date, formData.startTime, formData.endTime]);

    // Fetch price when any selection changes
    useEffect(() => {
        if (formData.courtId) {
            updatePrice();
        }
    }, [formData]);

    const checkAvailability = async () => {
        setLoading(true);
        setError(null);
        try {
            const { date, startTime, endTime } = formData;
            const [courtsRes, coachesRes, equipRes] = await Promise.all([
                availabilityService.getCourts(date, startTime, endTime),
                availabilityService.getCoaches(date, startTime, endTime),
                availabilityService.getEquipment(date, startTime, endTime)
            ]);

            setAvailableCourts(courtsRes.data.avalibleCourts || []);
            setAvailableCoaches(coachesRes.data.availableCoaches || []);
            setAvailableEquipment(equipRes.data.equipment || []);
        } catch (err) {
            console.error(err);
            setError("Failed to fetch availability");
        } finally {
            setLoading(false);
        }
    };

    const updatePrice = async () => {
        try {
            const payload = {
                courtId: formData.courtId,
                date: formData.date,
                startTime: formData.startTime,
                endTime: formData.endTime,
                equipment: formData.equipment.map(e => ({ equipment: e.id, quantity: e.quantity })),
                coachId: formData.coachId
            };

            const res = await pricingService.preview(payload);
            setPricePreview(res.data);
        } catch (err) {
            console.error("Price preview failed", err);
        }
    };

    const handleEquipmentChange = (eqId, quantity, maxQty) => {
        const qty = Math.max(0, Math.min(quantity, maxQty));
        setFormData(prev => {
            const existing = prev.equipment.find(e => e.id === eqId);
            let newEquipment;
            if (qty === 0) {
                newEquipment = prev.equipment.filter(e => e.id !== eqId);
            } else {
                if (existing) {
                    newEquipment = prev.equipment.map(e => e.id === eqId ? { ...e, quantity: qty } : e);
                } else {
                    newEquipment = [...prev.equipment, { id: eqId, quantity: qty }];
                }
            }
            return { ...prev, equipment: newEquipment };
        });
    };

    const handleBooking = async () => {
        try {
            const payload = {
                courtId: formData.courtId,
                date: formData.date,
                startTime: formData.startTime,
                endTime: formData.endTime,
                equipment: formData.equipment.map(e => ({ equipment: e.id, quantity: e.quantity })),
                coachId: formData.coachId
            };
            await bookingService.create(payload);
            alert("Booking Confirmed!");
            // Reset or redirect
            setStep(1);
            setFormData({ ...formData, courtId: null, coachId: null, equipment: [] });
            checkAvailability();
        } catch (err) {
            alert("Booking Failed: " + (err.response?.data?.message || err.message));
        }
    };

    return (
        <div className="booking-page_content" style={{ padding: '2rem 0' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 350px', gap: '2rem', alignItems: 'start' }}>

                <div className="main-content">
                    <TimeSelection
                        date={formData.date}
                        startTime={formData.startTime}
                        endTime={formData.endTime}
                        onDateChange={val => setFormData({ ...formData, date: val })}
                        onStartTimeChange={val => setFormData({ ...formData, startTime: val })}
                        onEndTimeChange={val => setFormData({ ...formData, endTime: val })}
                    />

                    <CourtSelection
                        courts={availableCourts}
                        selectedCourtId={formData.courtId}
                        onSelect={val => setFormData({ ...formData, courtId: val })}
                        loading={loading}
                    />

                    <EquipmentSelection
                        equipment={availableEquipment}
                        selectedEquipment={formData.equipment}
                        onChange={handleEquipmentChange}
                    />

                    <CoachSelection
                        coaches={availableCoaches}
                        selectedCoachId={formData.coachId}
                        onSelect={val => setFormData({ ...formData, coachId: val })}
                    />
                </div>

                <div className="sidebar">
                    <BookingSummary
                        date={formData.date}
                        startTime={formData.startTime}
                        endTime={formData.endTime}
                        pricePreview={pricePreview}
                        onConfirm={handleBooking}
                        canConfirm={formData.courtId}
                        loading={loading} // You might want a separate loading state for booking submission
                    />
                </div>

            </div>
        </div>
    );
};

export default BookingPage;

