/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('menus', (table) => {
        table.increments('menu_id').primary(); // メニューID（自動採番）
        table
            .integer('restaurant_id') // 外部キー: レストランID
            .notNullable()
            .references('restaurant_id')
            .inTable('restaurants')
            .onDelete('CASCADE'); // レストラン削除時に紐付くメニューも削除
        table.string('menu_name').notNullable(); // メニュー名（必須）
        table.decimal('price', 10).notNullable(); // 価格（必須）
        table.string('image_url'); // 画像URL（任意）
        table.timestamp('created_at').defaultTo(knex.fn.now()); // 作成日時（自動）
        table.timestamp('updated_at').defaultTo(knex.fn.now()); // 最終更新日時（自動）
        table
            .enu('status', ['active', 'passive']) // ステータス(表示するかしないか)
            .notNullable()
            .defaultTo('active'); // デフォルトは active
      });
    };

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('menus');
};
