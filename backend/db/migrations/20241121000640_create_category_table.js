/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('category', (table) => {
        table.increments('category_id').primary(); // カテゴリID（主キー）
        table.string('category_name').notNullable(); // カテゴリ名（必須）
      });
    };
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('category');
};
