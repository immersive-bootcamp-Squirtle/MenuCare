const menuModel = require("../models/menuModel.js");

exports.getMenus = async (req, res) => {
  try {
    const restaurant_id = req.params.id;
    // console.log("id:", restaurant_id);
    const menus = await menuModel.findAllMenu(restaurant_id);
    // console.log(menus);
    res.status(200).json(menus);
  } catch (err) {
    res.status(500).json({ error: "Failed to get menus" });
  }
};

exports.createMenu = async (req, res) => {
  try {
    const {
      restaurant_id = 1,
      menu_name,
      price,
      image_url,
      status = "active",
      allergies = [],
    } = req.body;

    // バリデーション
    if (!menu_name || !price || !image_url) {
      return res.status(400).json({
        error: "menu_name, price, and image_url are required.",
      });
    }

    if (!Array.isArray(allergies)) {
      return res.status(400).json({
        error: "Allergies must be an array.",
      });
    }

    // メニューを登録
    const result = await menuModel.addMenu({
      restaurant_id,
      menu_name,
      price,
      image_url,
      status,
    });

    console.log("Menu added:", result.menu_id);

    if (allergies.length > 0) {
      await menuModel.addAllergyInfo(result.menu_id, allergies);
    }

    res.status(201).json({
      message: "success",
      result,
    });
  } catch (err) {
    console.error("Error adding menu:", err);
    res.status(500).json({ error: "Failed to add the menu." });
  }
};

exports.updateMenu = async (req, res) => {
  const menu_id = parseInt(req.params.menu_id, 10);
  const { menu_name, price, image_url, status, allergies = [] } = req.body;

  if (!menu_id) {
    return res.status(400).json({ error: "menu_id is required." });
  }
  if (!menu_name || !price || !image_url) {
    return res.status(400).json({
      error: "menu_name, price, and image_url are required.",
    });
  }

  try {
    await menuModel.updateMenu(menu_id, {
      menu_name,
      price,
      image_url,
      status,
    });

    // console.log("MenuID:", menu_id);

    if (Array.isArray(allergies)) {
      await menuModel.updateAllergyInfo(menu_id, allergies);
    }

    res.status(200).json({ message: "Menu updated successfully." });
  } catch (err) {
    console.error("Error updating menu:", err);
    res.status(500).json({ error: "Failed to update menu" });
  }
};

exports.deleteMenu = async (req, res) => {
  const menu_id = parseInt(req.params.menu_id, 10);

  if (!menu_id) {
    return res.status(400).json({ error: "menu_id is required" });
  }

  try {
    await menuModel.deleteMenu(menu_id);
    res.status(200).json({ message: `Menu deleted successfully` });
  } catch (err) {
    console.error("Error deleting menu:", err);
    res.status(500).json({ error: "Failed to delete the menu" });
  }
};
