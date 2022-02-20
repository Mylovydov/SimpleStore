module.exports = function (request, response, next) {
  let {page, limit} = request;
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 8;

  console.log('pagination limit', limit);
  console.log('pagination page', page);

  request.skip = (page * limit) - limit;
  request.limit = limit;
  next();
};