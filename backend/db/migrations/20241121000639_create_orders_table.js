/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('orders', (table) => {
        table.increments('order_id').primary(); // 注文ID（主キー）
        table
          .integer('table_id') // 外部キー: テーブルID
          .notNullable()
          .references('table_id')
          .inTable('tables')
          .onDelete('CASCADE'); // テーブル削除時に注文も削除
        table
          .integer('menu_id') // 外部キー: メニューID
          .notNullable()
          .references('menu_id')
          .inTable('menus')
          .onDelete('CASCADE'); // メニュー削除時に注文も削除
        table.integer('quantity').notNullable().defaultTo(1); // 注文数量（デフォルト1）
        table.integer('table_customer_id').notNullable(); // 顧客識別ID
        table.timestamp('created_at').defaultTo(knex.fn.now()); // 作成日時
      });
    };

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('orders');

};
