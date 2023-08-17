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
          res.status(200).send(successResponseFormat(foundUser));
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

  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const foundUser = await User.findOne({
    where: { email: email },
  });
  if (foundUser) {
    res
      .status(401)
      .send(errorResponseFormat(`The user with the email : ${email} was already found.`));
  } else {
    User.create({
        name: name,
        email: email,
        password: hashedPassword,
    })
      .then(async() => {

        const foundUser = await User.findOne({
            where: { email: email },
          });

        res
          .status(200)
          .send(successResponseFormat(foundUser));
      })
      .catch((error) => {
        console.log(error);
        res
          .status(500)
          .send(
            errorResponseFormat(
              "Error trying to save, please try again later."
            )
          );
      });
  }
};


