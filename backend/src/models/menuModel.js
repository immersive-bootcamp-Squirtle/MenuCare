const knex = require("../../db/knex");

module.exports = {
  //メニューの全量を取得
  async findAllMenu(restaurantID) {
    const menu = await knex("menus")
      .select(
        "menus.menu_id",
        "menus.menu_name",
        "menus.price",
        "menus.image_url",
        "allergy.allergy_name"
      )
      .leftJoin("allergy_menu", "menus.menu_id", "=", "allergy_menu.menu_id")
      .leftJoin("allergy", "allergy_menu.allergy_id", "=", "allergy.allergy_id")
      .where({ "menus.restaurant_id": restaurantID });

    const new_menu = {};

    menu.forEach((value) => {
      //new_menuからmenuに
      if (!new_menu[value.menu_id]) {
        new_menu[value.menu_id] = {
          menu_id: value.menu_id,
          name: value.menu_name,
          price: value.price,
          image_url: value.image_url,
          allergies: [],
        };
      }
      if (value.allergy_name) {
        new_menu[value.menu_id].allergies.push(value.allergy_name);
      }
    });

    return Object.values(new_menu);
  },
  // 出力イメージ：
  //[
  // {
  //  "menu_id": 1,
  //  "menu_name": sample,
  //  "price": 1000,
  //  "allergy_ids":[1,2,3]
  // },
  //]
  //

  async addMenu(menuData) {
    try {
      const [menu_id] = await knex("menus")
        .insert({
          restaurant_id: menuData.restaurant_id,
          menu_name: menuData.menu_name,
          price: menuData.price,
          image_url: menuData.image_url,
          status: menuData.status,
          created_at: knex.fn.now(),
          updated_at: knex.fn.now(),
        })
        .returning("menu_id");

      return menu_id;
    } catch (error) {
      console.error("Error adding menu:", error);
      throw error;
    }
  },

  // アレルギー情報を登録する関数
  async addAllergyInfo(menu_id, allergies) {
    if (Array.isArray(allergies) && allergies.length > 0) {
      const allergyData = allergies.map((allergy_id) => ({
        menu_id: parseInt(menu_id, 10),
        allergy_id: parseInt(allergy_id, 10),
      }));

      try {
        await knex("allergy_menu").insert(allergyData);
        // console.log("Allergy data successfully inserted.");
      } catch (error) {
        // console.error("Error inserting allergy data:", error);
        throw error;
      }
    }
  },

  async updateMenu(menu_id, menuData) {
    try {
      await knex("menus").where({ menu_id }).update({
        menu_name: menuData.menu_name,
        price: menuData.price,
        image_url: menuData.image_url,
        status: menuData.status,
        updated_at: knex.fn.now(),
      });
      console.log(`Menu updated successfully.`);
    } catch (error) {
      console.error("Error updating menu:", error);
      throw error;
    }
  },

  async updateAllergyInfo(menu_id, allergies) {
    console.log("Updating allergies for menu_id:", menu_id);
  
    try {
      // 既存のアレルギー情報を削除
      await knex("allergy_menu").where({ menu_id }).del();

      const allergyData = allergies.map((allergy_id) => ({
        menu_id,
        allergy_id,
      }));
      await knex("allergy_menu").insert(allergyData);
  
      console.log(`Allergies updated successfully.`);
    } catch (error) {
      console.error("Error updating allergy info:", error);
      throw error;
    }
  },
  
  async deleteMenu(menu_id) {
    try {
      await knex("menus").where({ menu_id }).del();
    } catch (error) {
      console.error("Error delete menu:", error);
      throw error;
    }
  },
};
