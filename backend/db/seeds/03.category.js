/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('category').del()
  await knex('category').insert([
    {category_id: 1, category_name: 'Appetizers'},// 前菜
    {category_id: 2, category_name: 'Main'},// メイン
    {category_id: 3, category_name: 'Desserts'},// デザート
    {category_id: 4, category_name: 'Beverages'},// 飲み物
   
  ]);
};
