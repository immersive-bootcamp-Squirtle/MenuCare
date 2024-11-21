/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('administrators', (table) => {
        table.increments('admin_id').primary(); // 管理者ID（自動採番）
        table.string('email').notNullable().unique(); // メールアドレス（必須＆一意）
        table.string('password').notNullable(); // パスワード（必須）
        table.timestamp('created_at').defaultTo(knex.fn.now()); // 作成日時（自動）
        table.timestamp('updated_at').defaultTo(knex.fn.now()); // 更新日時（自動）
      });
    };
    

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('administrators'); // テーブル削除用
};
