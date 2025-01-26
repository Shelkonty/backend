import mongoose from 'mongoose';

const consultationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    details: {
        type: String,
        required: true,
        trim: true
    },
    siteType: {
        type: String,
        required: true,
        enum: ['Landing', 'Business Card', 'Corporate', 'Website redesign', 'Need consultation']
    },
    status: {
        type: String,
        enum: ['new', 'in_progress', 'completed', 'cancelled'],
        default: 'new'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

consultationSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

export const Consultation = mongoose.model('Consultation', consultationSchema);