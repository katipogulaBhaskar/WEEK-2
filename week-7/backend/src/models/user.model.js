import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({ 
    username : { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const User = mongoose.model("FSD", UserSchema);

// const getUserModelForBatch = (batchnumber) => {
//     if (!batchnumber) {
//         // If no batchnumber is provided, return the default model (FSD)
//         return User;
//     }

//     const modelName = `UserBatch${batchnumber}`; // e.g., UserBatch1, UserBatch2

//     // If the model for this batch already exists, return it.
//     if (mongoose.models[modelName]) {
//         return mongoose.models[modelName];
//     }

//     // Otherwise, create the model dynamically for this batch
//     return mongoose.model(modelName, UserSchema);
// };

export default User;