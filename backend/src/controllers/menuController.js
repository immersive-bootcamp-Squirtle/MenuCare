const menuModel = require('../models/menuModel.js');


exports.getMenus = async (req, res) => {
  try {
    const restaurant_id = req.params.id;
    console.log("id:",restaurant_id);
    const menus = await menuModel.findAllMenu(restaurant_id);
    console.log(menus);
    res.status(200).json(menus);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get menus' });
  }
};