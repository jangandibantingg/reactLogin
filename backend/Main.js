const express = require('express');
const app     = express();
const path    = require('path');
const mysql   = require('mysql');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const Router  = require('./Router');
const port    = 3000;

app.get("/cekrequest", (req, res)=> res.send("this is login page"));

// console.log(localhost:3000);
// datbase

const db = mysql.createConnection({
    host: 'localhost', 
    user: 'root',
    password: '',
    database:'react'

});

db.connect(function(err){
    if(err){
    console.log('DB error');
    throw err;
    return false;
    }
});

const sessionStore = new MySQLStore({
    expiration:(1825 * 86400 * 1000),
    endConectiononClose: false
}, db);

app.use(session({
    key: '1234',
    secret:  '1234',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: (1825 * 86400 * 1000),
        httpOnly: false
    }
}));

new Router(app, db);
app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
    
});



app.listen(port, () =>
    console.log(port)
);