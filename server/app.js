const express = require('express');
const path = require('path');
const router = require('./controllers');
let pokemonsInfo = require('./pokemons.json');

const handlebars = require('express-handlebars');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../client/public')));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.engine(
	'hbs',
	handlebars({
		layoutsDir: path.join(__dirname, 'views/layouts'),
		partialsDir: path.join(__dirname, 'views/layouts/partials'),
		defaultLayout: 'main',
		extname: 'hbs',
	})
);

app.use(router);

module.exports = app;
