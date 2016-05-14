var mysql = require('mysql');

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".

dbConnection = mysql.createConnection({
  user: 'root',
  password: '1234',
  database: 'chat'  
});

dbConnection.connect(err => {
  if (err) {
    console.log('Error connecting to Db', err);
    return;
  }
  console.log('Connection established');
});

exports.DB = dbConnection;
exports.DBConnect = () => { 
  exports.DB = mysql.createConnection({
    user: 'root',
    password: '1234',
    database: 'chat'  
  });
};