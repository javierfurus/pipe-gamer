exports.up = function (knex) {
  return knex.schema.createTable('cart', table => {
    table.integer('player_id').unsigned();
    table.integer('game_id').unsigned();
    table.foreign('player_id').references('player_list.player_id');
    table.foreign('game_id').references('game_list.game_id');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('cart');
};
