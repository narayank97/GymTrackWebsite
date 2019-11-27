const Pool = require('pg').Pool;

let myUsername = 'karunnarayan';
let myHost = 'localhost';
let myDatabase = 'hellodb';
let myPassword = 'abc';
let myPort = process.env.PORT||'5432';

let env = process.env.NODE_ENV;

console.log(process.env.DATABASE_URL);

let pool = new Pool({

    user: myUsername,
    host: myHost,
    database: myDatabase,
    password: myPassword,
    port: myPort,

});
if(process.env.DATABASE_URL != undefined){
    connectionString = {
        connectionString: process.env.DATABASE_URL,
        ssl: true
    };
    console.log("Checking db");
    pool = new Pool(connectionString);
    console.log("After db we out here");
}



const createTable = (request, response) => {
    pool.query('CREATE TABLE IF NOT EXISTS newtesttable(aword varchar(40),palindrome varchar(80))', (error,results) =>{
        if(error){
            console.log("There was a Error in CreateTable");
            throw error;
        }
        console.log(results);
        //response.status(200);
    })
}

const getRows = (request, response) => {
    pool.query('SELECT * FROM public.newtesttable', (error,results) =>{
        if(error){
            console.log("There was a Error getting the rows boss");
            throw error;
        }
        console.log(results.rows);
        response.status(200).json(results.rows);
    })
}

const insertRecord = (request, response) => {
    let ezJSON = JSON.stringify(request.params);
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    console.log(request.outputStr);
    console.log("???????????????");
    //console.log(response);
    pool.query("INSERT INTO newtesttable(aword,palindrome)values('"+request.inputStr+"','"+request.outputStr+"')", (error,results) =>{
        if(error){
            console.log("There was a Error when inserting boss");
            throw error;
        }
        console.log(results.rows);
        //response.status(200).json(results.rows);
    })
}

module.exports = {
    getRows,
    createTable,
    insertRecord,
}