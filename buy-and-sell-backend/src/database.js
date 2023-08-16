import mysql from 'mysql'

const connection = mysql.createConnection({
    host: 'localhost', 
    user: 'hapi-server', 
    password: 'abc123!',
    database: 'buy-and-sell',
})

export const db = {
    connect: () => connection.connect,
    // converting the mysql query function into a promise so that we can use async await instead of callbacks 
    query: (queryString, escapedValues) =>
        new Promise((resolve, reject) => {
            // last parameter is the callback function 
            connection.query(queryString, escapedValues, (error, results, fields) => {
                if (error) reject(error); 
                resolve({results, fields}); 
            })
        }), 
    // called when the server shuts down 
    end: () => connection.end(),
}