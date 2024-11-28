/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('orders').del()
  await knex('orders').insert([
    { table_id: 1, menu_id: 1, quantity: 2, customer_id: 101, created_at: knex.fn.now() }, 
    { table_id: 1, menu_id: 2, quantity: 1, customer_id: 101, created_at: knex.fn.now() },
    { table_id: 2, menu_id: 3, quantity: 3, customer_id: 102, created_at: knex.fn.now() },
  ]);
};
