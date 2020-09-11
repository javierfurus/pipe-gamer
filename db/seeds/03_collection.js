exports.seed = function (knex) {
  return knex('collection').del()
    .then(function () {
      const collection = [
        {
          player_id: 1,
          game_id: 2,
          progress: 98,
          favorite: 1
        }
      ];

      return knex('collection').insert(collection);
    });
};
