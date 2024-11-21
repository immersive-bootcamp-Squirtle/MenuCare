const express = require('express')
const router = express.Router()
const menuController = require('../controllers/menuController')

//メニュー一覧の取得
router.get('/:id/menus', menuController.getMenus);


module.exports = router;