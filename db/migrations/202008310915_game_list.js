exports.up = function (knex) {
  return knex.schema.createTable('game_list', table => {
    table.increments('game_id').primary();
    table.string('title', 50).notNullable();
    table.string('publisher', 50).notNullable();
    table.string('description', 2000);
    table.integer('price');
    table.integer('year');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('game_list');
};
