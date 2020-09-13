var express = require('express');
const knex = require('../db/knex');
var router = express.Router();
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
    // Postnál ismét megcsináljuk ugyanezt
    req.method = 'POST';
    req.url = req.path;
  }
  next();
});
// Render the game list
router.get('/', async (req, res, next) => {
  const user = await knex('player_list').select().where('player_id', 1).first();
  const cart = await knex('cart')
    .select()
    .where('player_id', 1)
    .join('game_list', 'game_list.game_id', '=', 'cart.game_id');
  const games = await knex('game_list')
    .leftJoin('collection', 'collection.game_id', 'game_list.game_id')
    .select('collection.*', 'game_list.*');
  const sum = await knex('cart')
    .where('player_id', 1)
    .join('game_list', 'game_list.game_id', '=', 'cart.game_id')
    .sum('price as total')
    .first();
  res.render('games', { title: 'Games', games, user, cart, sum });
});
// Get more info about a game
router.get('/details/:id', async (req, res, next) => {
  const id = req.params.id;
  const game = await knex('game_list')
    .select()
    .where('game_list.game_id', id)
    .join('review', 'review.game_id', '=', 'game_list.game_id')
    .join('player_list', 'player_list.player_id', '=', 'review.player_id')
    .first();
  res.render('details', game);
});
// Add a game to the collection of a player (now hardcoded: 1)
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
  await knex('collection').where('game_id', id).del();
  res.redirect('back');
});
// Buy, buy, buy!
router.put('/buy', async (req, res, next) => {
  const sum = await knex('cart')
    .where('player_id', 1)
    .join('game_list', 'game_list.game_id', '=', 'cart.game_id')
    .sum('price as total')
    .first();
  await knex('player_list')
    .where('player_id', 1)
    .decrement('credits', sum.total);
  await knex('cart')
    .where('player_id', 1)
    .del();
  res.redirect('back');
});
// Add items to your cart
router.post('/cart/:id', async (req, res, next) => {
  const id = req.params.id;
  const cart = {
    player_id: 1,
    game_id: id
  };
  await knex('cart').insert(cart);
  res.redirect('back');
});
// Remove something from your cart!
router.delete('/cart/:id', async (req, res, next) => {
  const id = req.params.id;
  await knex('cart').where('game_id', id).del();
  res.redirect('back');
});
module.exports = router;
