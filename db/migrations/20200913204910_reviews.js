exports.up = function (knex) {
  return knex.schema.createTable('review', table => {
    table.increments('review_id').primary();
    table.integer('player_id').unsigned();
    table.integer('game_id').unsigned();
    table.foreign('player_id').references('player_list.player_id');
    table.foreign('game_id').references('game_list.game_id');
    table.string('review', 2000);
    table.integer('score').unsigned();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('review');
};
