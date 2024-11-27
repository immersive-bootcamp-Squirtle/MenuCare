/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('administrators').del()
  await knex('administrators').insert([
    {
      email: 'admin1@example.com', 
      password: 'password',
      created_at: knex.fn.now(),
      updated_at: knex.fn.now()
    },
    {
      email: 'admin2@example.com', 
      password: 'password',
      created_at: knex.fn.now(),
      updated_at: knex.fn.now()
    },
    {
      email: 'admin3@example.com', 
      password: 'password',
      created_at: knex.fn.now(),
      updated_at: knex.fn.now()
    },
  ]);
};
