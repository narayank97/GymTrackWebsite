require('dotenv').config();
const express = require('express');
const {Client} = require('pg');
const app = express();

const PORT = process.env.PORT || 3000;
const {DATABASE_URL} = process.env;

var http = require('http');
var server = http.Server(app);

const db = require('./createDB')

db.createTable();
//***************************Sending Input through url as query*************************************

function palindromeHandler(req,res,next){
    let url = req.url;
    let qObj = req.query;
    console.log(qObj);
    if(qObj.word != undefined){

        revWord = qObj.word.split("").reverse().join("");
        let ogWord = qObj.word;
        let palindromeWord = qObj.word+revWord;
        req.inputStr = ogWord;
        req.outputStr = palindromeWord;
        //db.insertRecord(null,null,ogWord,palindromeWord);
        
        res.json({"word":qObj.word,"Palindrome":qObj.word+revWord});
        db.insertRecord(req,res);

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

app.get('/getRows',db.getRows);

app.get('/insertRecord', db.insertRecord);


app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))