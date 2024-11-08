import express from "express";

import { logInHealth, signUpHealth, logoutHealth } from '../controllers/health.controller.js';

import { createAppointment, listAppointments, updateAppointment, deleteAppointment } from '../controllers/health.controller.js';

const router = express.Router();

router.post('/signupHealth', signUpHealth);

router.post('/loginHealth', logInHealth);

router.get('/logoutHealth', logoutHealth);

router.post('/create', createAppointment);

router.get('/list', listAppointments);

router.put('/update/:id', updateAppointment);

router.delete('/delete/:id', deleteAppointment);

export default router;