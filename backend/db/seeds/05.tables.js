/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('tables').del()
  await knex('tables').insert([
    { table_id: 1, table_name: 'Table 1', QR_url: 'https://example.com/table1', status: 'active', restaurant_id: 1 },
    { table_id: 2, table_name: 'Table 2', QR_url: 'https://example.com/table2', status: 'active', restaurant_id: 1 },
    { table_id: 3, table_name: 'Table 3', QR_url: 'https://example.com/table3', status: 'passive', restaurant_id: 1 },
    { table_id: 4, table_name: 'Table 4', QR_url: 'https://example.com/table4', status: 'active', restaurant_id: 1 },
  ]);
};
