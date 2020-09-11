var express = require('express');
const knex = require('../db/knex');
var router = express.Router();

/* GET users listing. */
router.get('/', async (req, res, next) => {
  const games = await knex('game_list')
    .leftJoin('collection', 'collection.game_id', 'game_list.game_id')
    .select('collection.*', 'game_list.*');
  res.render('games', { title: 'Games', games });
});
router.use((req, res, next) => {
  // Itt megnézzük, hogy a hívás, amit kapunk, az mi
  if (req.query._method === 'DELETE') {
    // Ezzel megváltoztatjuk az eredeti metódust DELETE-re
    req.method = 'DELETE';
    // Majd visszalakítjuk az eredeti URL-t, pl. /todos/1
    req.url = req.path;
  }
  if (req.query._method === 'PUT') {
    // Putnál ismét megcsináljuk ugyanezt
    req.method = 'PUT';
    req.url = req.path;
  }
  if (req.query._method === 'POST') {
    // Putnál ismét megcsináljuk ugyanezt
    req.method = 'POST';
    req.url = req.path;
  }
  next();
});
router.post('/:id', async (req, res, next) => {
  const collection = {
    player_id: 1,
    game_id: req.params.id,
    progress: 0,
    favorite: 1
  };
  await knex('collection').insert(collection);
  res.redirect('back');
});
router.delete('/:id', async (req, res, next) => {
  const id = req.params.id;
  await knex('collection')
    .where('game_id', id)
    .del();
  res.redirect('back');
});

router.get('/:id', async (req, res, next) => {
  const id = req.params.id;
  const price = await knex('game_list')
    .select('price')
    .where('game_id', id)
    .first();
  await knex('player_list')
    .where('player_id', 1)
    .decrement('credits', price.price);
  res.redirect('back');
});
module.exports = router;
