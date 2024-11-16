import mongoose from 'mongoose';

// Define the schema for the User model
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true, // Username is required
        unique: true,   // Ensure the username is unique in the database
        trim: true,     // Trim any whitespace around the username
    },
    password: {
        type: String,
        required: true, // Password is required
    },
}, {
    timestamps: true, // Automatically add createdAt and updatedAt fields
});

// Create the User model based on the schema
const User = mongoose.model('myuser', userSchema);

export default User;
