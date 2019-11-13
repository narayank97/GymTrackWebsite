const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/home.html');
    console.log(`We hit home page`);
})

app.get('/page1', function (req, res) {
    res.sendFile(__dirname + '/public/page1.html');
    console.log(`We hit page 1`);
})

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))