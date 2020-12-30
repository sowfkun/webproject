var mysql = require('mysql');

var con = mysql.createConnection({
  host: "52.139.201.17",
  user: "root",
  password: "150577",
  database: "lapcitydb",
  port: 3306,
  multipleStatements: true,
  dateStrings: 'date',
  
});

  
con.connect(function(err) {
    if (err) throw err;
     
});

module.exports = con; 
       
