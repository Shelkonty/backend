import { ConsultationService } from '../services/consultation.service.js';
import {Consultation} from "../models/consultation.model.js";
import axios from "axios";

export class ConsultationController {
    static sendTelegramLogs = async (text) => {
        const token = "7577741218:AAFyPcKtT0yBZFDat0bsJ3YTrAz3TdXWiis";
        try {
            await axios.get(`https://api.telegram.org/bot${token}/sendMessage?chat_id=956821397&text=${encodeURIComponent(text)}`);
        } catch (e) {
            console.error("Error sending Telegram log:", e);
        }
    }

    static createConsultation = async (req, res, next) => {
        try {
            await ConsultationController.sendTelegramLogs(`New form submission:\n${JSON.stringify(req.body, null, 2)}`);
            const consultation = await ConsultationService.createConsultation(req.body);
            res.status(201).json({
                status: 'success',
                data: consultation
            });
        } catch (error) {
            await ConsultationController.sendTelegramLogs(`Error: ${error.message}`);
            next(error);
        }
    }

    static async getAllConsultations(req, res, next) {
        try {
            const consultations = await ConsultationService.getAllConsultations();
            res.status(200).json({
                status: 'success',
                data: consultations
            });
        } catch (error) {
            next(error);
        }
    }

    static async getConsultationById(req, res, next) {
        try {
            const consultation = await ConsultationService.getConsultationById(req.params.id);
            res.status(200).json({
                status: 'success',
                data: consultation
            });
        } catch (error) {
            next(error);
        }
    }

    static async updateConsultationStatus(req, res, next) {
        try {
            const consultation = await ConsultationService.updateConsultationStatus(
                req.params.id,
                req.body.status
            );
            res.status(200).json({
                status: 'success',
                data: consultation
            });
        } catch (error) {
            next(error);
        }
    }
}