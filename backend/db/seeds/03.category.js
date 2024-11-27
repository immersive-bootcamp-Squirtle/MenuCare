/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('category').del()
  await knex('category').insert([
    {category_name: 'Appetizers'},// 前菜
    {category_name: 'Main'},// メイン
    {category_name: 'Desserts'},// デザート
    {category_name: 'Beverages'},// 飲み物
   
  ]);
};
