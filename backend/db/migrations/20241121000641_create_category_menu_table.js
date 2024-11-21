/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('category_menu', (table) => {
        table
          .integer('menu_id') // 外部キー: メニューID
          .notNullable()
          .references('menu_id')
          .inTable('menus')
          .onDelete('CASCADE'); // メニュー削除時に関連データも削除
        table
          .integer('category_id') // 外部キー: カテゴリID
          .notNullable()
          .references('category_id')
          .inTable('category')
          .onDelete('CASCADE'); // カテゴリ削除時に関連データも削除
        table.primary(['menu_id', 'category_id']); // 複合主キー？？
      });
    };

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('category_menu');

};
