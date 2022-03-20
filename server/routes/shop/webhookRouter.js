const Router = require('express');
const express = require('express');
const router = new Router();
const {webhook} = require('../../controllers/shop/WebhookController');

router.post('/', webhook);

module.exports = router;