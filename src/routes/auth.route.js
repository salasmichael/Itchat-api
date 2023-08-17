const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const connection = require('../database');

const authController = require("../controllers/auth.controller");
const app = express();


app.post("/login",authController.login);
app.post("/create",authController.createUser);

module.exports = app;
