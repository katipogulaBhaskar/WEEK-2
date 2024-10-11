const express = require("express");

const { logInAdmin} = require('../controller/login')

const Routes = express.Router();

Routes.post('/login', logInAdmin);

module.exports = Routes;