var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "150577",
  database: "lapcitydb",
  multipleStatements: true,
  dateStrings: 'date'
});

  
con.connect(function(err) {
    if (err) throw err;
     
});

module.exports = con; 
       
