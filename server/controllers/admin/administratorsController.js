const helpers = require('../../helpers/helpers');
const Admin = require('../../models/Admin');
const {validationResult} = require('express-validator');

class AdminsController {

  async create(request, response) {
    try {
      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        return response.status(400).json({message: 'Ошибка при создании администратора', errors});
      }
      const {username, email, password} = request.body;

      const candidate = await Admin.findOne({email});

      if (candidate) {
        return response.status(400).json({message: `Пользователь с email: ${email} уже существует`});
      }

      console.log(username, email, password);

      const hashPassword = await helpers.hashingPassword(password);
      const admin = await Admin.create({username, email, password: hashPassword});

      return response.json({message: `Администратор ${username} успешно добавлен`, admin});
    } catch (e) {
      console.log(e);
    }
  }

  async update(request, response) {
    try {
      const {username, email, password} = request.body;
      const {id: _id} = request.params;

      const checkDuplicate = await Admin.find(
        {
          $and: [
            {_id: {$ne: _id}},
            {email}
          ]
        }
      );
      if (checkDuplicate.length) {
        return response.status(400).json({message: `Пользователь с email: ${email} уже существует`});
      }

      const hashPassword = helpers.hashingPassword(password);

      const updatedAdmin = await Admin.findByIdAndUpdate(
        {_id},
        {username, email, password: hashPassword},
        {new: true}
      );

      return response.json({message: `Данные ${username} успешно обновлены`, updatedAdmin});
    } catch (e) {
      console.log(e);
    }
  }

  async remove(request, response) {
    const {id: _id} = request.params;
    const removedAdmin = await Admin.findByIdAndDelete({_id});
    return response.json({message: `${removedAdmin.username} успешно удалён`});
  }

  async getAll(request, response) {
    const admins = await Admin.find();
    response.json(admins);
  }

  async getOne(request, response) {
    const {id: _id} = request.params;
    const admin = await Admin.findOne({_id});
    return response.json(admin);
  }
}

module.exports = new AdminsController();