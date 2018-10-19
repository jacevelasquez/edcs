var fs = require('fs');
var sqlite3 = require('sqlite3').verbose();
const csv=require('csvtojson')
db3 = new sqlite3.Database('foodconsumption.db');

exports.get = function(req, res){
	
  db3.all("select distinct f11.eacode, localsurveyareas.areaname from f11 INNER JOIN localsurveyareas ON  f11.eacode = localsurveyareas.eacode ORDER BY f11.eacode", function(err,rows){ 
 
    res.render('dietaryhome.ejs',{rows:rows,layout:false,session:req.session});
  });
};

exports.save_newea = function(req, res){
	
	db3.all("select eacode from localsurveyareas where eacode = '"+ req.body.eacode +"'", function(err, rows){
		console.log(rows);
	if(rows == '') {
		res.send('error');
	}
	if(rows !='') {
		sql = "INSERT OR IGNORE INTO f11(eacode, hcn, shsn) VALUES('" + req.body.eacode + "', '', '');";
				   //  ////console.log(sql);   
					 db3.all(sql  ,function(err,rows){
						if(err) console.log("Error number : " + err);
						//                 console.log(sql)
						//                 console.log("INSERTED RECORD #" + rn);
					});
					res.send('ok');
		}
	});
};

exports.uploadf11 = function(req, res, next){
	
  csvFilePath=req.file.path;
csv()
.fromFile(csvFilePath)
.on('json',(jsonObj)=>{
   
    JSON2Sqlite(jsonObj);
})
.on('done',(error)=>{
    console.log('end');
	res.redirect('/dietaryhome/');
})
 
};

function JSON2Sqlite(json){
   var col = [];
   var values =[];
   var  sql ="";
   var  rn = 0;
     for (var k in json){
            if(k=='id'){
                ////console.log(sql);   
               if(col.length>0){
                    db3.all(sql  ,function(err,rows){
                      if(err) console.log(err);
                       rn++;
                       console.log("INSERTED RECORD #" + rn);
                  //      console.log("1st : " + sql);
                   });
                         col = [];
                         values = [];
                       }
             }
            else{
              col.push(k);
              values.push(json[k]);
            }
        }
		console.log(json);
           if(col.length>0){
                sql = "INSERT OR IGNORE INTO f11("  + col.join(",") + ") VALUES('" +
                    values.join("','") + "');";
               //  ////console.log(sql);   
                 db3.all(sql  ,function(err,rows){
                    if(err) console.log("Error number : " + err);
                                       rn++;
                      //                 console.log(sql)
//                    console.log("INSERTED RECORD #" + rn);
                });

				sql2 = "INSERT OR IGNORE INTO f61("+col[0]+","+col[1]+","+col[2]+","+col[3]+","+col[4]+","+col[5]+","+col[15]+","+col[16]+","+col[18]+") VALUES('"+values[0]+"','"+values[1]+"','"+values[2]+"','"+values[3]+"','"+values[4]+"','"+values[5]+"','"+values[15]+"','"+values[16]+"','"+values[18]+"');";
               //  ////console.log(sql);   
                 db3.all(sql2  ,function(err,rows){
                    if(err) console.log("Error number : " + err);
                                       rn++;

                });
				
				
                  col = [];
                   values = [];

             }
}






