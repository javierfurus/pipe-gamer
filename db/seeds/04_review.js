exports.seed = function (knex) {
  return knex('collection').del()
    .then(function () {
      const review = [
        {
          player_id: 1,
          game_id: 2,
          review: 'This game is so bad, damn. But I love it so much! 1/100, I would recommend it to everyone who I hate!',
          score: 100
        },
        {
          player_id: 1,
          game_id: 3,
          review: 'Too lazy to check what game is behind this ID. So I leave eversthing in fate\'s hand. This game is GOLDEN. Best one on the market. ',
          score: 70
        }
      ];

      return knex('review').insert(review);
    });
};
