import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware';
import { createTrip, listTrips, updateTrip, deleteTrip } from '../controllers/trip.controller';
import { body } from 'express-validator';
import { validate } from '../middleware/validate.middleware';


const router = Router();


router.post('/create', authMiddleware, [
body('title').isString().notEmpty(),
body('startDate').isISO8601(),
body('endDate').isISO8601()
], validate, createTrip);


router.get('/', authMiddleware, listTrips);
router.put('/:id', authMiddleware, updateTrip);
router.delete('/:id', authMiddleware, deleteTrip);


export default router;