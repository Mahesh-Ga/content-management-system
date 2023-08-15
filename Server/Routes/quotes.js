const express = require('express');
const mysql = require('mysql');
const config = require('config');
const appForQuotes = express.Router();

var connection = mysql.createConnection(
    {
        host: config.get('HOST'),
        user: config.get('USER'),
        password: config.get('PASSWORD'),
        database: config.get('DATABASE')
    }
);

appForQuotes.get("/", (request, response) => {
    connection.query(`SELECT * FROM Quotes`, (error, result) => {
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

appForQuotes.post("/", (request, response) => {
    connection.query(`INSERT INTO Quotes(text, author , user_id) VALUES("${request.body.text}",'${request.body.author}',${request.body.user_id})`, (error, result) => {
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

appForQuotes.put("/:id", (request, response) => {
    connection.query(`UPDATE Quotes SET text = "${request.body.text}", author = '${request.body.author}' WHERE quote_id = ${request.params.id}`, (error, result) => {
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

appForQuotes.delete("/:id", (request, response) => {
    connection.query(`DELETE FROM Quotes WHERE quote_id = ${request.params.id}`, (error, result) => {
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
module.exports = appForQuotes;