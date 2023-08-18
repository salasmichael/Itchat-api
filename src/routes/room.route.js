const express = require('express');
const roomController = require("../controllers/rooms.controller");
const app = express();

app.get("/",roomController.rooms);

module.exports = app;
