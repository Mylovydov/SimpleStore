const Admin = require('../models/Admin');
const helpers = require('../helpers/helpers');

module.exports = async function (request, response, next) {
  try {
    const checkAdmin = await Admin.find();

    if (checkAdmin.length === 0) {

      const hashPassword = helpers.hashingPassword(process.env.BASE_PASSWORD);

      const admin = await Admin.create({
        username: process.env.BASE_USERNAME,
        email: process.env.BASE_EMAIL,
        password: hashPassword
      });
    }

    next();
  } catch (e) {
    console.log(e);
  }
};