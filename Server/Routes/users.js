const express = require('express');
const mysql = require('mysql');
const config = require('config');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const appForUsers = express.Router();

var connection = mysql.createConnection(
    {
        host: config.get('HOST'),
        user: config.get('USER'),
        password: config.get('PASSWORD'),
        database: config.get('DATABASE')
    }
);

const secretKey = crypto.randomBytes(32).toString('hex');

function generateToken(user) {
    const payload = { id: user.id, username: user.username };
    return jwt.sign(payload, secretKey, { expiresIn: '1h' });
}

function verifyToken(req, res, next) {
    const token = req.headers.authorization;
  
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
  
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Failed to authenticate token' });
      }
      const userId = decoded.id;
      next();
    });
}
  
appForUsers.post("/", (request, response) => {
    connection.query(`INSERT INTO Users(first_name , last_name, email, password , mobile) VALUES('${request.body.firstName}','${request.body.lastName}','${request.body.email}','${request.body.password}','${request.body.mobile}')`, (error, result) => {
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

appForUsers.post("/login", (request, response) => {
    const { email , password } = request.body;
    connection.query(`SELECT * FROM Users`, (error, result) => {
        if (error == null) {
            const user = result.find(u => u.email === email && u.password === password);
            const token = generateToken(user);
            return response.json( { token } );
        }
        else {
            response.setHeader("Content-Type", "application/json");
            response.write(JSON.stringify(error));
        }
        response.end();
    })
})


appForUsers.get('/protected', verifyToken, (request, response) => {
    response.json({ message: 'You have access to this route' });
});

appForUsers.get("/", (request, response) => {
    connection.query(`SELECT * FROM Users`, (error, result) => {
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

appForUsers.put("/:id", (request, response) => {
    connection.query(`UPDATE Users SET first_name = '${request.body.firstName}', last_name = '${request.body.lastName}',email = '${request.body.email}', Address = '${request.body.address}' , mobile = '${request.body.mobile}' WHERE user_id = ${request.params.id}`, (error, result) => {
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

module.exports = appForUsers;