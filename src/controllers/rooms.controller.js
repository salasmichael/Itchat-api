require("dotenv").config();

const Room = require("../models/rooms.model");
const { errorResponseFormat, successResponseFormat} = require("../functions/responseFunctions");


exports.rooms = async (req, res) => {
  
    try {
      const rooms = await Room.findAll();
      if (rooms) {
          res.status(200).send(successResponseFormat(rooms));
      } else {
        res.status(401).send(errorResponseFormat('Invalid credentials'));
      }
    } catch (error) {
      console.error(error);
      res.status(500).send(errorResponseFormat('An error occurred'));
    }
  };

