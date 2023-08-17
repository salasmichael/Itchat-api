const express = require('express');
const authController = require("../controllers/auth.controller");
const app = express();

app.post("/login",authController.login);
app.post("/create",authController.createUser);

module.exports = app;
