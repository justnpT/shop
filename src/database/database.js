var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'qweqwe123',
    database : 'shop'
});

connection.connect();

connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
});
connection.query('INSERT INTO offers (idoffers, price, title, description, details)' +
    'VALUES (\'2\', \'123\', \'ksiazka\', \'super ksiazka\', \'naprawde niezla ksiazka\');')






connection.end();