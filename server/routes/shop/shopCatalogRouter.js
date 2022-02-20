const Router = require('express');
const router = new Router();
const {getAll, getOne, getPaginated, getNoveltiesAndPopular} = require('../../controllers/shop/shopProductController');
const filterMiddleware = require('../../middleware/filterMiddleware');
const paginationMiddleware = require('../../middleware/paginationMiddleware');
const parseQueryMiddleware = require('../../middleware/parseQueryMiddleware');

router.get('/one-product/:slug', getOne);
router.get('/novelties-popular/', getNoveltiesAndPopular);
router.get('/paginated/*', parseQueryMiddleware, paginationMiddleware, filterMiddleware, getPaginated);
router.get('/*', parseQueryMiddleware, paginationMiddleware, filterMiddleware, getAll);

module.exports = router;