/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('allergy_menu').del()
  await knex('allergy_menu').insert([
    {menu_id: 1, allergy_id: 1},
    {menu_id: 6, allergy_id: 1},
    {menu_id: 6, allergy_id: 2},
    {menu_id: 6, allergy_id: 3},
    {menu_id: 2, allergy_id: 1},
    {menu_id: 2, allergy_id: 3},
    {menu_id: 3, allergy_id: 17},
    {menu_id: 3, allergy_id: 21},
    {menu_id: 4, allergy_id: 2},
    {menu_id: 5, allergy_id: 4},
  ]);
};
