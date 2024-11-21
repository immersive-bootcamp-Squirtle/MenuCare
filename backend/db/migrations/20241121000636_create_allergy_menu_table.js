/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('allergy_menu', (table) => {
        table
          .integer('menu_id') // 外部キー: メニューID
          .notNullable()
          .references('menu_id')
          .inTable('menus')
          .onDelete('CASCADE'); // メニュー削除時に関連データも削除
        table
          .integer('allergy_id') // 外部キー: アレルギーID
          .notNullable()
          .references('allergy_id')
          .inTable('allergy')
          .onDelete('CASCADE'); // アレルギー削除時に関連データも削除
        table.primary(['menu_id', 'allergy_id']); // 複合主キー？？
      });
    };

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('allergy_menu');
};
