import express from "express";
import { logInUser, signUpUser, changePassword, logoutUser } from '../controller/userLogin.controller.js';
import  protectRoute  from '../middleware/user.middleware.js'

const router = express.Router();

router.post('/signupUser', signUpUser);

router.post('/loginUser', logInUser);

router.put('/change-password',protectRoute, changePassword);

router.get('/logout', logoutUser);

export default router;