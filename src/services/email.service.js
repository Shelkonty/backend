import {mailOptions as _mailOptions, transporter} from '../config/email.config';

class EmailService {
    static async sendConsultationRequest(consultationData) {
        const {name, phone, email, service, details} = consultationData;

        const mailOptions = {
            ..._mailOptions,
            subject: 'Новая заявка на консультацию',
            text: `
                Новая заявка на консультацию:
                
                Имя: ${name}
                Телефон: ${phone}
                Email: ${email}
                Необходимая услуга: ${service}
                Детали проекта: ${details}
            `
        };

        try {
            await transporter.sendMail(mailOptions);
            return true;
        } catch (error) {
            console.error('Ошибка отправки email:', error);
            throw new Error('Ошибка отправки уведомления');
        }
    }
}

export default EmailService;