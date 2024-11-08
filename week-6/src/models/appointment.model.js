import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({ 
    patientId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    providerId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    date: { 
        type: Date, 
        required: true 
    },
    status: { 
        type: String, 
        enum: ['scheduled', 'completed', 'cancelled'], 
        default: 'scheduled' 
    },
}, { timestamps: true });

const Appointment = mongoose.model("Appointment", appointmentSchema);

export default Appointment;

