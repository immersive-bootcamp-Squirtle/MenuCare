const express = require('express')
const router = express.Router()
const menuController = require('../controllers/menuController')
const multer = require("multer"); 
const upload = multer();
//メニュー一覧の取得
router.get('/:id/menus', menuController.getMenus);

//メニュー登録
router.post('/:id/menus', upload.single("image"), menuController.createMenu);

//メニュー更新
router.put('/:id/menus/:menu_id',upload.single("image"), menuController.updateMenu);

//メニュー削除(RESTful)
router.delete("/:id/menus/:menu_id", menuController.deleteMenu);

module.exports = router;