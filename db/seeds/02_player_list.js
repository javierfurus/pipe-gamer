exports.seed = function (knex) {
  return knex('player_list').del()
    .then(function () {
      const player_list = [
        {
          nickname: 'javfur',
          first_name: 'Javier',
          last_name: 'Furus',
          credits: 20000
        }
      ];

      return knex('player_list').insert(player_list);
    });
};