var fs = require('fs');
var sqlite3 = require('sqlite3').verbose();
const csv=require('csvtojson')
db3 = new sqlite3.Database('foodconsumption.db');
var json2csv = require('json2csv');
var easyzip = require('easy-zip');


exports.get = function(req, res){
	
 eacode = req.params.id ;
	var m = new Date();
	var dateString = m.getFullYear() + "-" + ("0" + (m.getMonth()+1)).slice(-2) + "-" + ("0" + m.getDate()).slice(-2) + "_" + ("0" + m.getHours()).slice(-2) + "" + ("0" + m.getMinutes()).slice(-2) + "" +("0" + m.getSeconds()).slice(-2);
	var name = "DIETARY";
	
    db3.all("SELECT * FROM f11 WHERE eacode='" + eacode + "'",function(err,rows){

      if(err) console.log(err);
          var flds =[];
              for(var idx in rows) {
                var item = rows[idx];
                for(var key in item) {
                  if(flds.indexOf(key)==-1)
                  flds.push(key);
                }
              }
    var csv = json2csv({data:rows, fields:flds});
    var zip2 = new easyzip.EasyZip();
    zip2.file('f11_' + eacode + '_' + name+ '_' + dateString + '.csv',csv);
	
	db3.all("SELECT * FROM f60 WHERE eacode='" + eacode + "'",function(err,rows){

      if(err) console.log(err);
          var flds =[];
              for(var idx in rows) {
                var item = rows[idx];
                for(var key in item) {
                  if(flds.indexOf(key)==-1)
                  flds.push(key);
                }
              }
    var csv = json2csv({data:rows, fields:flds});
    zip2.file('f60_' + eacode + '_' + name+ '_' + dateString + '.csv',csv);
	
	db3.all("SELECT * FROM f61 WHERE eacode='" + eacode + "'",function(err,rows){

      if(err) console.log(err);
          var flds =[];
              for(var idx in rows) {
                var item = rows[idx];
                for(var key in item) {
                  if(flds.indexOf(key)==-1)
                  flds.push(key);
                }
              }
    var csv = json2csv({data:rows, fields:flds});
    zip2.file('f61_' + eacode + '_' + name+ '_' + dateString + '.csv',csv);
	
	db3.all("SELECT * FROM f63 WHERE eacode='" + eacode + "'",function(err,rows){

      if(err) console.log(err);
          var flds =[];
              for(var idx in rows) {
                var item = rows[idx];
                for(var key in item) {
                  if(flds.indexOf(key)==-1)
                  flds.push(key);
                }
              }
    var csv = json2csv({data:rows, fields:flds});
    zip2.file('f63_' + eacode + '_' + name+ '_' + dateString + '.csv',csv);
	
	db3.all("SELECT * FROM f64 WHERE eacode='" + eacode + "'",function(err,rows){

      if(err) console.log(err);
          var flds =[];
              for(var idx in rows) {
                var item = rows[idx];
                for(var key in item) {
                  if(flds.indexOf(key)==-1)
                  flds.push(key);
                }
              }
    var csv = json2csv({data:rows, fields:flds});
    zip2.file('f64_' + eacode + '_' + name+ '_' + dateString + '.csv',csv);
	
	db3.all("SELECT * FROM f71 WHERE eacode='" + eacode + "'",function(err,rows){

      if(err) console.log(err);
          var flds =[];
              for(var idx in rows) {
                var item = rows[idx];
                for(var key in item) {
                  if(flds.indexOf(key)==-1)
                  flds.push(key);
                }
              }
    var csv = json2csv({data:rows, fields:flds});
    zip2.file('f71_' + eacode + '_' + name+ '_' + dateString + '.csv',csv);
	
	db3.all("SELECT * FROM f76 WHERE eacode='" + eacode + "'",function(err,rows){

      if(err) console.log(err);
          var flds =[];
              for(var idx in rows) {
                var item = rows[idx];
                for(var key in item) {
                  if(flds.indexOf(key)==-1)
                  flds.push(key);
                }
              }
    var csv = json2csv({data:rows, fields:flds});
    zip2.file('f76_' + eacode + '_' + name+ '_' + dateString + '.csv',csv);
	
	db3.all("SELECT * FROM localarea_listings WHERE eacode='" + eacode + "'",function(err,rows){

      if(err) console.log(err);
          var flds =[];
              for(var idx in rows) {
                var item = rows[idx];
                for(var key in item) {
                  if(flds.indexOf(key)==-1)
                  flds.push(key);
                }
              }
    var csv = json2csv({data:rows, fields:flds});
    zip2.file('listings_' + eacode + '_' + name+ '_' + dateString + '.csv',csv);
	
	db3.all("SELECT * FROM localsurveyareas WHERE eacode='" + eacode + "'",function(err,rows){

      if(err) console.log(err);
          var flds =[];
              for(var idx in rows) {
                var item = rows[idx];
                for(var key in item) {
                  if(flds.indexOf(key)==-1)
                  flds.push(key);
                }
              }
    var csv = json2csv({data:rows, fields:flds});
    zip2.file('localsurveyareas_' + eacode + '_' + name+ '_' + dateString + '.csv',csv);

	
	/******************************************************************************/
	
	zip2.writeToResponse(res,eacode+'_DIETARY_'+dateString+'_ALL');
	
	/******************************************************************************/
	
			
			// zip.file('f11_'+eacode+'_'+req.session.username+'_'+dateString+'.csv',csv);
			// zip.writeToResponse(csv,'./csv/'+eacode+'_'+req.session.username+'_'+dateString+'_ALL.zip');
	}); //f11
	}); //f60
	}); //f61
	}); //f63
	}); //f64
	}); //f11
	}); //f76
	}); //listings
	}); //areas
	
};