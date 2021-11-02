const usersModel = require('../models/usersModel');
const renderError = require('../helper/renderError').renderError

const USER_ALREADY_EXISTS = 'E-mail inválido ou já cadastrado, por favor, verifique e tente novamente'

const USER_WRONG ='email ou senha inválidos, por favor, verifique e tente novamente' 

const createUser = async (body) => {
  const { email } = body; 
  console.log(email, 'email')
  const userMail = await usersModel.findUserByEmail(email);

  if (userMail) {
    return renderError(USER_ALREADY_EXISTS);
  }
  return usersModel.createUser(body);
};

const loginUser = async (email, password) => {
  const userMail = await usersModel.findUserByEmail(email);
  if(!userMail) return renderError(USER_WRONG)
  if (userMail.password !== password) {
    return renderError(USER_WRONG) 
  }
return userMail;
};

module.exports = { createUser, loginUser };