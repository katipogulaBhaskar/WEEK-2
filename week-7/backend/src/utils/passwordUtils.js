import bcrypt from 'bcryptjs';

// Hash a password
export const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10); // Generate salt with 10 rounds
    return bcrypt.hash(password, salt); // Return the hashed password
};

// Compare a plain text password with the hashed password
export const comparePassword = async (enteredPassword, storedHash) => {
    return bcrypt.compare(enteredPassword, storedHash); // Returns true or false
};
