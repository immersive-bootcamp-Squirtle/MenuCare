const knex = require('../../db/knex')

module.exports = {
//メニューの全量を取得
  async findAllMenu(restaurantID) {

    const menu = await knex('menus')
    .select('menus.menu_id','menus.menu_name','menus.price','menus.image_url','allergy.allergy_name')
    .leftJoin('allergy_menu', 'menus.menu_id', '=', 'allergy_menu.menu_id')
    .leftJoin('allergy', 'allergy_menu.allergy_id', '=', 'allergy.allergy_id')
    .where({'menus.restaurant_id':restaurantID});
    

    const new_menu = {};

    menu.forEach(value =>{  //new_menuからmenuに
      if(!new_menu[value.menu_id]){

          new_menu[value.menu_id] = {
          menu_id:value.menu_id,
          name:value.menu_name,
          price:value.price,
          image_url:value.image_url,
          allergies:[],
      };
     }
     if(value.allergy_name){
      new_menu[value.menu_id].allergies.push(value.allergy_name)
    }
    })

    return Object.values(new_menu);
  }
}




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