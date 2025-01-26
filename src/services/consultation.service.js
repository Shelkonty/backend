import { Consultation } from '../models/consultation.model.js';

export class ConsultationService {
    static async createConsultation(consultationData) {
        try {
            console.log('Received data:', consultationData); // Debug log
            const consultation = new Consultation({
                name: consultationData.name,
                phone: consultationData.phone,
                email: consultationData.email,
                siteType: consultationData.siteType,
                details: consultationData.details
            });
            const savedConsultation = await consultation.save();
            console.log('Saved consultation:', savedConsultation); // Debug log
            return savedConsultation;
        } catch (error) {
            console.error('MongoDB error:', error); // Debug log
            throw new Error('Error saving consultation: ' + error.message);
        }
    }

    static async getAllConsultations() {
        try {
            return await Consultation.find().sort({ createdAt: -1 });
        } catch (error) {
            throw new Error('Ошибка при получении заявок');
        }
    }

    static async getConsultationById(id) {
        try {
            const consultation = await Consultation.findById(id);
            if (!consultation) {
                throw new Error('Заявка не найдена');
            }
            return consultation;
        } catch (error) {
            throw new Error('Ошибка при получении заявки');
        }
    }

    static async updateConsultationStatus(id, status) {
        try {
            const consultation = await Consultation.findByIdAndUpdate(
                id,
                { status },
                { new: true, runValidators: true }
            );
            if (!consultation) {
                throw new Error('Заявка не найдена');
            }
            return consultation;
        } catch (error) {
            throw new Error('Ошибка при обновлении статуса заявки');
        }
    }
}