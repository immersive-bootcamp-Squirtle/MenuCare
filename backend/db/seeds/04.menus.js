/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('menus').del()
  await knex('menus').insert([
    {
      menu_id: 1, 
      restaurant_id: 1,
      menu_name: '目玉焼き',
      price: 1000,
      image_url: "src/assets/egg.png",
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
      status: 'active',
    },
    {
      menu_id: 2, 
      restaurant_id: 1,
      menu_name: 'ガトーショコラ',
      price: 1500,
      image_url: "src/assets/cake.png",
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
      status: 'active',
    },
    {
      menu_id: 3, 
      restaurant_id: 1,
      menu_name: '生ハムのサラダ',
      price: 800,
      image_url: "src/assets/salad.png",
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
      status: 'active',
    },
    {
      menu_id: 4, 
      restaurant_id: 1,
      menu_name: '鶏肉のごま味噌焼き',
      price: 800,
      image_url: "src/assets/chicken.png",
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
      status: 'active',
    },
    {
      menu_id: 5, 
      restaurant_id: 1,
      menu_name: 'トマトパスタ',
      price: 1000,
      image_url: "src/assets/pasta.png",
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
      status: 'active',
    },
    {
      menu_id: 6, 
      restaurant_id: 1,
      menu_name: 'エビチリ',
      price: 700,
      image_url: "src/assets/ebichiri.png",
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
      status: 'active',
    },
  ]);
};
