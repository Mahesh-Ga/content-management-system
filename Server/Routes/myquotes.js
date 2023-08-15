const express = require('express');
const mysql = require('mysql');
const config = require('config');
const appForMyQuotes = express.Router();

var connection = mysql.createConnection(
    {
        host: config.get('HOST'),
        user: config.get('USER'),
        password: config.get('PASSWORD'),
        database: config.get('DATABASE')
    }
);

appForMyQuotes.get("/:id", (request, response) => {
    connection.query(`SELECT * FROM Quotes where user_id = ${request.params.id}`, (error, result) => {
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

module.exports = appForMyQuotes;