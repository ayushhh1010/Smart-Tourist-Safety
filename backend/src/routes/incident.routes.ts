import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware';
import { reportIncident, listIncidents, getIncident, panicIncident, emergencyNotify, efirIncident } from '../controllers/incident.controller';
import { body } from 'express-validator';
import { validate } from '../middleware/validate.middleware';


const router = Router();


router.post('/report', authMiddleware, [
body('type').isString().notEmpty(),
body('location').isObject(),
body('description').optional().isString()
], validate, reportIncident);

router.post("/panic", authMiddleware, panicIncident);
router.get('/', authMiddleware, listIncidents);
router.get('/:id', authMiddleware, getIncident);
router.post("/emergency", authMiddleware, emergencyNotify);
router.post("/efir", authMiddleware, efirIncident);

export default router;