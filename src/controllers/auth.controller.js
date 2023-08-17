require("dotenv").config();

const bcrypt = require('bcrypt');
const User = require("../models/user.model");
const { errorResponseFormat, successResponseFormat} = require("../functions/responseFunctions");


exports.login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const foundUser = await User.findOne({
        where: { email: email }
      });
  
      if (foundUser) {
        const isPasswordValid = await bcrypt.compare(password, foundUser.password);
  
        if (isPasswordValid) {
          res.status(200).send(successResponseFormat({ message: 'Login successful', user: foundUser }));
        } else {
          res.status(401).send(errorResponseFormat('Invalid credentials'));
        }
      } else {
        res.status(401).send(errorResponseFormat('Invalid credentials'));
      }
    } catch (error) {
      console.error(error);
      res.status(500).send(errorResponseFormat('An error occurred'));
    }
  };


exports.createUser = async (req, res) => {
  const { body } = req;

  const foundEndowments = await User.findOne({
    where: { email: body.email },
  });
  if (foundEndowments) {
    res
      .status(200)
      .send(errorResponseFormat(`El usuario con correo: ${body.email} ya cuenta con este equipo asociado!`));
  } else {
    User.create({
      serial: body.serial,
      name: body.name,
      type: body.type,
      sysOperative: body.sysOperative,
      username: body.username,
      email: body.email,
      dateAssignment: body.dateAssignment,
    })
      .then(() => {
        res
          .status(200)
          .send(successResponseFormat("Registrado exitosamente"));
      })
      .catch((error) => {
        console.log(error);
        res
          .status(500)
          .send(
            errorResponseFormat(
              "Ha ocurrido un error, por favor intenta mas tarde"
            )
          );
      });
  }
};


