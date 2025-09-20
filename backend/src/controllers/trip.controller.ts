import { Request, Response, NextFunction } from 'express';
import {Trip} from '../models/Trip.model';


export const createTrip = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req as any).userId;
        const trip = await Trip.create({ ...req.body, user: userId });
        res.status(201).json(trip);
    }catch (err) {
        next(err);
    }
};


export const listTrips = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req as any).userId;
        const trips = await Trip.find({ user: userId }).sort({ startDate: -1 });
        res.json(trips);
    } catch (err) {
        next(err);
    }
};


export const updateTrip = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const trip = await Trip.findByIdAndUpdate(id, req.body, { new: true });
        res.json(trip);
    } catch (err) {
        next(err);
    }
};


export const deleteTrip = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        await Trip.findByIdAndDelete(id);
        res.json({ ok: true });
    } catch (err) {
        next(err);
    }
};