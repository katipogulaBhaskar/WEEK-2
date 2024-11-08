import bycrypt from 'bcryptjs';
import User from '../models/user.model.js';
import Appointment from '../models/appointment.model.js';


export const signUpHealth = async(req,res) => {
    try {
        const { name, email, password, role } = req.body;
        const user = await User.findOne( { email });

        if(user) {
            return res.status(400).json({ error: "User Already Exists" });
        }

        const salt = await bycrypt.genSalt(10);
        const hashPassword = await bycrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: hashPassword,
            role,
        })

        if(newUser) {
            await newUser.save();
            console.log("New User Created..");
            res.status(201).json({
                _id: newUser._id,
                name : newUser.name,
            })
        } else {
            res.status(400).json({ error : "Invalid user data.."});
        }

    } catch(error) {
        console.log("Error in singup controller", error.message);
        res.status(500).json({ error: "Internal Server Error.." });
    }
}

export const logInHealth = async(req,res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        const isPasswordCorrect = await bycrypt.compare(password, user?.password || '' );
        
        if(!user || !isPasswordCorrect ) {
            return res.status(400).json({ success: false, error: "Invalid Username or password" });
        }

        console.log("Admin Logged In", user);
        res.status(200).json({ success: true, name : user.name });

    } catch ( error ) {
        console.log("Error in Login controller", error.message);
        res.status(500).json({ success: false, error: "Internal Server Error" });

    }
}



export const logoutHealth = async(req,res) => {
    try {
        console.log("Admin Log Out");
        res.status(200).json({ message: "Logged Out Successful" });

    } catch(error) {
        console.log("Error in Login controller", error.message);
        res.status(500).json({ error: "Internal Server error" });
    }

}

export const createAppointment = async (req, res) => {
    try {
        const { patientId, providerId, date } = req.body;
        
        // Create the new appointment
        const newAppointment = new Appointment({ patientId, providerId, date });
        await newAppointment.save();
        
        res.status(201).json({ message: "Appointment created successfully", appointment: newAppointment });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const listAppointments = async (req, res) => {
    try {
        // Fetch all appointments, optionally populate patient and provider details
        const appointments = await Appointment.find()
            .populate('patientId', 'name email')
            .populate('providerId', 'name email');
        
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update an appointment
export const updateAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        const { date, status } = req.body;

        // Find and update the appointment
        const updatedAppointment = await Appointment.findByIdAndUpdate(
            id,
            { date, status },
            { new: true } // Return the updated document
        );
        
        if (!updatedAppointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }

        res.status(200).json({ message: "Appointment updated successfully", appointment: updatedAppointment });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete an appointment
export const deleteAppointment = async (req, res) => {
    try {
        const { id } = req.params;

        // Find and delete the appointment
        const deletedAppointment = await Appointment.findByIdAndDelete(id);

        if (!deletedAppointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }

        res.status(200).json({ message: "Appointment deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};