exports.up = function (knex) {
  return knex.schema.createTable('collection', table => {
    table.integer('player_id').unsigned();
    table.integer('game_id').unsigned();
    table.foreign('player_id').references('player_list.player_id');
    table.foreign('game_id').references('game_list.game_id');
    table.integer('progress').defaultTo(0);
    table.boolean('favorite').defaultTo(0);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('collection');
};
