const express = require('express');
const router = express.Router();

const logoutController = require('../app/controllers/LogoutController');

router.delete('/', logoutController.delete);

module.exports = router;
