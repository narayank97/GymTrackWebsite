require('dotenv').config();
const express = require('express');
const {Client} = require('pg');
const app = express();

const PORT = process.env.PORT || 3000;
const {DATABASE_URL} = process.env;

var http = require('http');
var server = http.Server(app);

//***************************Sending Input through url as query*************************************

function palindromeHandler(req,res,next){
    let url = req.url;
    let qObj = req.query;
    console.log(qObj);
    if(qObj.word != undefined){

        revWord = qObj.word.split("").reverse().join("");
        res.json({"word":qObj.word,"Palindrome":qObj.word+revWord});

    }
    else{
        next();
    }

}

//***************************This part establishes Database****************************************


//*******************This part deals with the routing********************************************

app.use('/', express.static(__dirname + '/public'));

app.use("/scripts", express.static(__dirname + '/public/javascripts'));

app.get('/', function (req, res){
    console.log(`We hit page 1`);
    res.setHeader('Content-type','text/html');
    res.sendFile(__dirname + '/public/palindrome.html');
    
})

app.get('/palindrome', palindromeHandler);   // http://....../palindrome?word=...

// app.get('/page1', function (req, res) {
//     res.sendFile(__dirname + '/public/page1.html');
//     console.log(`We hit page 1`);
// })

// const client  = new Client({
//     connectionString: DATABASE_URL,
// });

// res.statusCode = 200;

// res.setHeader('Content-Type','text/plain');
// client.connect().then(() => client.query('SELECT * FROM hellotable'))
//                 .then((result) => {
//                     res.end(`${result.rows[0].name}\n`);
//                     client.end();
//                 })
//                 .catch(() => {
//                     res.end('ERROR');
//                     client.end();
//                 });

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))