import Court from "../models/Court.model.js";
import PricingRule from "../models/PricingRule.model.js";
import Equipment from "../models/Equipment.model.js";
import Coach from "../models/Coach.model.js";

// Courts 
export const getCourts = async (req, res) => {
    try {
        const courts = await Court.find();
        res.json(courts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const createCourt = async (req, res) => {
    try {
        const court = await Court.create(req.body);
        res.status(201).json(court);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const updateCourt = async (req, res) => {
    try {
        const court = await Court.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(court);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Pricing Rules
export const getPricingRules = async (req, res) => {
    try {
        const rules = await PricingRule.find();
        res.json(rules);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const createPricingRule = async (req, res) => {
    try {
        const rule = await PricingRule.create(req.body);
        res.status(201).json(rule);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const updatePricingRule = async (req, res) => {
    try {
        const rule = await PricingRule.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(rule);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Equipment  
export const getEquipment = async (req, res) => {
    try {
        const eq = await Equipment.find();
        res.json(eq);
    } catch (err) { res.status(500).json({ message: err.message }); }
};

export const updateEquipment = async (req, res) => {
    try {
        const eq = await Equipment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(eq);
    } catch (err) { res.status(400).json({ message: err.message }); }
};

// Coach 
export const getCoaches = async (req, res) => {
    try {
        const coaches = await Coach.find();
        res.json(coaches);
    } catch (err) { res.status(500).json({ message: err.message }); }
};

export const updateCoach = async (req, res) => {
    try {
        const coach = await Coach.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(coach);
    } catch (err) { res.status(400).json({ message: err.message }); }
};
