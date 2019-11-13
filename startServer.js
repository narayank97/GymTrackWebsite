const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

var http = require('http');
var server = http.Server(app);

//***************************This part establishes Database****************************************
const { Client } = require('pg');

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  });

client.connect();

client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
    if (err) throw err;
    for (let row of res.rows) {
      console.log(JSON.stringify(row));
    }
    client.end();
});

  //*******************This part deals with the routing********************************************

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/home.html');
    console.log(`We hit home page`);
})

app.get('/page1', function (req, res) {
    res.sendFile(__dirname + '/public/page1.html');
    console.log(`We hit page 1`);
})

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))