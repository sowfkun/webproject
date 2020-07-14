const db= require('../database/db');


const sql = `SELECT DISTINCT brand_name, serie
    FROM product
    WHERE product_status= 'active'
    ORDER BY serie;

    SELECT DISTINCT brand_name FROM product
    WHERE product_status='active'
    ORDER BY brand_name;
    
    SELECT *
    FROM event
    ORDER BY date_start DESC;

    SELECT *
    FROM event
    WHERE url=?;

    SELECT *
    FROM event
    WHERE status='đang diễn ra' or status='sắp diễn ra'
    ORDER BY date_start DESC
    LIMIT 6;
    
`


module.exports.list=function(req, res) {
    

    db.query(sql,[0], function (err, result, fields) {
      if (err) throw err;
      res.render('event_list', {
        title : 'Sự kiện',
        pagename: 'Sự kiện khuyến mại',

        serie: result[0],      
        menu: result[1],            

        event: result[2],
      });
  });
}

module.exports.event=function(req, res) {
    
  var url= req.params.url.toString();
  db.query(sql,[url], function (err, result, fields) {
    if (err) throw err;
    var event= result[3]; 

    res.render('event_detail', {
      title : 'Sự kiện',
      pagename: 'SỰ KIỆN' + ' ' + event[0].status.toUpperCase(),
      serie: result[0],       
      menu: result[1],           

      event: event[0],
      moreevent: result[4]
    });
});
}

