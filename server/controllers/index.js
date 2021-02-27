const express = require('express');
const router = express.Router();
const home = require('./home');
const search = require('./search');

router.get('/', home.getFiveRandomPokemons);
router.get('/search', search.searchAutocompleteData);
router.get('/search/:name', search.searchResult);

module.exports = router;
