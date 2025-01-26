import {createTransport} from 'nodemailer';

const emailConfig = {
    transporter: createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    }),
    mailOptions: {
        from: process.env.EMAIL_USER,
        to: process.env.ADMIN_EMAIL
    }
};

export default emailConfig;