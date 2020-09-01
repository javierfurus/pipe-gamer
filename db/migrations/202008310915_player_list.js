exports.up = function (knex) {
  return knex.schema.createTable('player_list', table => {
    table.increments('player_id').primary();
    table.string('nickname', 1000).notNullable();
    table.string('first_name', 1000).notNullable();
    table.string('last_name', 1000).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('player_list');
};
