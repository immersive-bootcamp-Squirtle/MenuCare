const express = require('express');
const router = express.Router();
const healthCheckController = require('../controllers/healthCheckController');

// すべてのアレルギーを取得
router.get('/', healthCheckController.healthCheck);


module.exports = router;