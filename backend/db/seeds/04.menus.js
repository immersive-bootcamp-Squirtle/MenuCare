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
      menu_name: 'Sample Menu 1',
      price: 1000,
      image_url: "sample/path",
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
      status: 'active',
    },
    {
      menu_id: 2, 
      restaurant_id: 1,
      menu_name: 'Sample Menu 2',
      price: 1500,
      image_url: "sample/path",
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
      status: 'active',
    },
    {
      menu_id: 3, 
      restaurant_id: 1,
      menu_name: 'Sample Menu 3',
      price: 800,
      image_url: "sample/path",
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
      status: 'active',
    },
  ]);
};
