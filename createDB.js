const Pool = require('pg').Pool;
const pool = new Pool({

    user:'karunnarayan',
    host: 'localhost',
    database: 'hellodb',
    password: 'abc',
    port: '5432',

});

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
            console.log("There was a Error boss");
            throw error;
        }
        console.log(results.rows);
        response.status(200).json(results.rows);
    })
}

const insertRecord = (request, response) => {
    pool.query("INSERT INTO newtesttable(aword,palindrome)values('test','testing')", (error,results) =>{
        if(error){
            console.log("There was a Error boss");
            throw error;
        }
        console.log(results.rows);
        response.status(200).json(results.rows);
    })
}

module.exports = {
    getRows,
    createTable,
    insertRecord,
}