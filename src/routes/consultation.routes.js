import express from 'express';
import { ConsultationController } from '../controllers/consultation.controller.js';
import { validateConsultation, validate } from '../middle-ware/validator.middleware.js';

const router = express.Router();

router.post('/', validateConsultation, validate, ConsultationController.createConsultation);
router.get('/', ConsultationController.getAllConsultations);
router.get('/:id', ConsultationController.getConsultationById);
router.patch('/:id/status', ConsultationController.updateConsultationStatus);

export default router;