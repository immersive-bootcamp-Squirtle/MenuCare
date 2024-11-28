const menuModel = require("../models/menuModel.js");
const s3Service = require("../services/s3Service.js");

exports.getMenus = async (req, res) => {
  try {
    const restaurant_id = req.params.id;
    // console.log("id:", restaurant_id);
    const menus = await menuModel.findAllMenu(restaurant_id);
    // console.log(menus);

    const menusWithSignedUrls = await Promise.all(
      menus.map(async (menu) => {
        if (menu.image_url) {
          // S3の署名付きURLを生成
          // console.log("image_url:",menu.image_url)
          const signedUrl = await s3Service.generateDownloadUrl(menu.image_url);
          // console.log("signedUrl:",signedUrl)
          return { ...menu, image_url: signedUrl };
        }
        return menu;
      })
    );

    res.status(200).json(menusWithSignedUrls);
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
      // image_url,
      status = "active",
    } = req.body;
    let allergies = req.body.allergies;

    if (!Array.isArray(allergies)) {
      if (typeof allergies === "string") {
        allergies = JSON.parse(allergies);
      } else if (typeof allergies === "number") {
        allergies = [allergies]; // 数値の場合は配列に変換
      }
    }
    // console.log("file:",file);
    // バリデーション
    if (!menu_name || !price) {
      console.log("valid error");
      return res.status(400).json({
        error: "menu_name, price, and image_url are required.",
      });
    }

    if (!Array.isArray(allergies)) {
      console.log("array error");
      return res.status(400).json({
        error: "Allergies must be an array.",
      });
    }

    // console.log("file:", file);
    // const imagePath = await s3Service.uploadToS3(file.buffer, file.mimetype);
    const {preSignedUrlForS3Upload, path} = await s3Service.generateUploadUrl()

    // console.log("imagePath:",imagePath)
    // メニューを登録
    const result = await menuModel.addMenu({
      restaurant_id,
      menu_name,
      price,
      imagePath: path,
      status,
    });

    // console.log("Menu added:", result.menu_id);
    // console.log("allergies:", allergies);
    if (allergies.length > 0) {
      await menuModel.addAllergyInfo(result.menu_id, allergies);
    }

    res.status(201).json({
      message: "success",
      result,
      preSignedUrlForS3Upload: preSignedUrlForS3Upload,
      path: path
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
