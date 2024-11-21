/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('tables', (table) => {
        table.increments('table_id').primary(); // テーブルID（主キー）
        table
          .enu('status', ['active', 'passive']) // テーブルの状態（active/passive）
          .notNullable()
          .defaultTo('active'); // デフォルトはactive
        table.string('table_name').notNullable(); // テーブル名（必須）
        table.string('QR_url').notNullable(); // QRコードURL（必須）
        table
          .integer('restaurant_id') // 外部キー: レストランID
          .notNullable()
          .references('restaurant_id')
          .inTable('restaurants')
          .onDelete('CASCADE'); // レストラン削除時にテーブルも削除
      });
    };

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('tables');
};
