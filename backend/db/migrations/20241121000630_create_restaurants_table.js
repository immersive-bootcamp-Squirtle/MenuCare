/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('restaurants', (table) => {
      table.increments('restaurant_id').primary(); // レストランID（自動採番）
      table
        .integer('admin_id') // 管理者ID（外部キー）
        .notNullable()
        .references('admin_id')
        .inTable('administrators')
        .onDelete('CASCADE'); // 管理者削除時に店舗も削除
      table.string('restaurant_name').notNullable(); // レストラン名（必須）
      table.timestamp('created_at').defaultTo(knex.fn.now()); // 作成日時（自動）
      table.timestamp('updated_at').defaultTo(knex.fn.now()); // 更新日時（自動）
    });
  };


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('restaurants');

};
