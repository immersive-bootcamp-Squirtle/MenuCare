const express = require('express');
const router = express.Router();
const allergyController = require('../controllers/allergyController');

// すべてのアレルギーを取得
router.get('/', allergyController.getAllAllergies);


module.exports = router;