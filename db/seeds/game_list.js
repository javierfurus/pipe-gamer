exports.seed = function (knex) {
  return knex('game_list').del()
    .then(function () {
      const game_list = [
        {
          title: 'Call of Duty: Duty Not Available',
          publisher: 'Activision',
          year: 2012
        },
        {
          title: 'Sonic the Hedgehog',
          publisher: 'SEGA',
          year: 1991
        },
        {
          title: 'Mastermind',
          publisher: 'LeviSoft',
          year: 2020
        },
        {
          title: '2048',
          publisher: 'E-Za Entertainment',
          year: 2020
        },
        {
          title: 'Marvel\'s Spider Man',
          publisher: 'Sony Computer Entertainment Europe',
          year: 2018
        },
        {
          title: 'Batman: Arkham Asylum',
          publisher: 'WB Interactive',
          year: 2012
        },
        {
          title: 'Krunker',
          publisher: 'Yendis Entertainment',
          year: 2018
        },
        {
          title: 'Command & Conquer: Red Alert',
          publisher: 'Virgin Interactive Entertainment',
          year: 1997
        }
      ];

      return knex('game_list').insert(game_list);
    });
};
