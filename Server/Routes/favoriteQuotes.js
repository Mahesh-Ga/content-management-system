const express = require('express');
const mysql = require('mysql');
const config = require('config');
const appForMyFavoriteQuotes = express.Router();

var connection = mysql.createConnection(
    {
        host: config.get('HOST'),
        user: config.get('USER'),
        password: config.get('PASSWORD'),
        database: config.get('DATABASE')
    }
);

appForMyFavoriteQuotes.get("/:id", (request, response) => {
    connection.query(`SELECT Quotes.quote_id,text,author FROM FavoriteQuotes, Quotes Where FavoriteQuotes.quote_id = Quotes.quote_id and  FavoriteQuotes.user_id = ${request.params.id}`, (error, result) => {
        if (error == null) {
            response.setHeader("Content-Type", "application/json");
            response.write(JSON.stringify(result));
        }
        else {
            response.setHeader("Content-Type", "application/json");
            response.write(JSON.stringify(error));
        }
        response.end();
    })
})

appForMyFavoriteQuotes.post("/", (request, response) => {
    connection.query(`INSERT INTO FavoriteQuotes VALUES(${request.body.user_id} , ${request.body.quote_id}) `, (error, result) => {
        if (error == null) {
            response.setHeader("Content-Type", "application/json");
            response.write(JSON.stringify(result));
        }
        else {
            response.setHeader("Content-Type", "application/json");
            response.write(JSON.stringify(error));
        }
        response.end();
    })
})

appForMyFavoriteQuotes.delete("/:id", (request, response) => {
    connection.query(`DELETE FROM FavoriteQuotes WHERE quote_id = ${request.params.id} and user_id =  ${request.query.user_id} `, (error, result) => {
        if (error == null) {
            response.setHeader("Content-Type", "application/json");
            response.write(JSON.stringify(result));
        }
        else {
            response.setHeader("Content-Type", "application/json");
            response.write(JSON.stringify(error));
        }
        response.end();
    })
})

module.exports = appForMyFavoriteQuotes;