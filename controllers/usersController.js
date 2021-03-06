const jwt = require('jsonwebtoken');
const usersService = require('../services/usersServices');
require('dotenv').config();

const createUser = async (req, res) => {
  const { body } = req;
  
  console.log(body, 'body');
const user = await usersService
.createUser(body);
if (user.err) return res.status(422).json(user);

res.status(200).send(body);
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  
  const user = await usersService.loginUser(email, password);
  if (user.err) return res.status(422).json(user);
  const { _id, role } = user; 
  const segredo = process.env.SECRETPASSWORD;

   const jwtConfig = { 
    expiresIn: '1h',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ 
    payload: { email, password, userId: _id, role } }, segredo, jwtConfig);

    res.status(200).json({ token });
};

const getAllUser = async (req, res) => {
  const user = await usersService.getAllUser();
  return res.status(200).json({ data: user });
};

module.exports = { createUser, loginUser, getAllUser };