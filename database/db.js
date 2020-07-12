var mysql = require('mysql');

var con = mysql.createConnection({
  host: "40.119.232.204",
  user: "sowfkun",
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
       
