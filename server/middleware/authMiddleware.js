const helpers = require('../helpers/helpers');

module.exports = function (request, response, next) {
  if (request.method === 'OPTIONS') {
    next();
  }

  try {
    const token = request.headers.authorization.split(' ')[1];
    if (!token) {
      return response.status(401).json({
        message: 'Не авторизован'
      });
    }

    const decodedData = helpers.verifyTokenData(token, process.env.SECRET_KEY);
    request.user = decodedData;

    next();

  } catch (e) {
    return response.status(401).json({
      message: 'Вы не авторизованы'
    });
  }
};