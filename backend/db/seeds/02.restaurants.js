/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('restaurants').del()
  await knex('restaurants').insert([
    {
      restaurant_id: 1,
      admin_id: 1,
      restaurant_name: 'Restaurant1',
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
    {
      restaurant_id: 2,
      admin_id: 2,
      restaurant_name: 'Restaurant2',
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
    {
      restaurant_id: 3,
      admin_id: 3,
      restaurant_name: 'Restaurant3',
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },

  ]);
};
