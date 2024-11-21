/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('allergy', (table) => {
        table.increments('allergy_id').primary(); // アレルギーID（主キー、自動採番）
        table.string('allergy_name').notNullable().unique(); // アレルギー名（必須、ユニーク）
      });
    };
    

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('allergy'); // テーブル削除
};
