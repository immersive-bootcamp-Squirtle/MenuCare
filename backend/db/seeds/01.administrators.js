/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('administrators').del()
  await knex('administrators').insert([
    {
      admin_id: 1, 
      email: 'admin1@example.com', 
      password: 'password',
      created_at: knex.fn.now(),
      updated_at: knex.fn.now()
    },
    {
      admin_id: 2, 
      email: 'admin2@example.com', 
      password: 'password',
      created_at: knex.fn.now(),
      updated_at: knex.fn.now()
    },
    {
      admin_id: 3, 
      email: 'admin3@example.com', 
      password: 'password',
      created_at: knex.fn.now(),
      updated_at: knex.fn.now()
    },
  ]);
};
