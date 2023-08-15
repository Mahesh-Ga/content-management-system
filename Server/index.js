const express = require('express');
const appForUsers = require('./Routes/users');
const appForQuotes = require('./Routes/quotes');
const appForMyQuotes = require('./Routes/myquotes');
const appForMyFavQuotes = require('./Routes/favoriteQuotes');

const config = require('config');
const app = express();

app.use((request, response, next) => {
    response.setHeader("Access-Control-Allow-Origin", "*")
    response.setHeader("Access-Control-Allow-Methods", "*")
    response.setHeader("Access-Control-Allow-Headers", "*")
    next();
});

app.use(express.json());

app.use('/users', appForUsers);
app.use('/quotes', appForQuotes);
app.use('/myquotes', appForMyQuotes);
app.use('/myfavquotes', appForMyFavQuotes);

app.listen(config.get('PORT'), () => {
    console.log("Server is listening at " + config.get('PORT'));
})