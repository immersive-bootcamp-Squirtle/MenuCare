/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('category_menu').del()
  await knex('category_menu').insert([
    { menu_id: 1, category_id: 1 }, // メニュー1はカテゴリ1に属する
    { menu_id: 2, category_id: 1 }, // メニュー2はカテゴリ1に属する
    { menu_id: 3, category_id: 2 }, // メニュー3はカテゴリ2に属する
  ]);
};
