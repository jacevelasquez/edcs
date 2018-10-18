var fs = require('fs');
var sqlite3 = require('sqlite3').verbose();
const csv=require('csvtojson')
db3 = new sqlite3.Database('foodconsumption.db');

exports.get = function(req, res){

  db3.all("SELECT * from f63 WHERE eacode='" + req.params.id.substring(0,12) + "' and hcn='" + req.params.id.substring(12,16) + "' and shsn='" + req.params.id.substring(16,20) + "' and LINENO > 0   order by LINENO*1", function(err,rows){  
  
			res.render('foodrecord.ejs',{rows:rows,layout:false,session:req.session});

  });
};

exports.view = function(req, res){

  db3.all("SELECT * from f63 WHERE eacode='" + req.params.id.substring(0,12) + "' and hcn='" + req.params.id.substring(12,16) + "' and shsn='" + req.params.id.substring(16,20) + "' and LINENO > 0   order by LINENO*1", function(err,rows){
  
   
	res.render('foodrecord.ejs',{rows:rows,layout:false,session:req.session});
  });
};

exports.view = function(req, res){
	var obj = {};
	var eacode = req.body.eacode;
	var hcn = req.body.hcn;
	var shsn = req.body.shsn;

	  db3.all("SELECT * from f63 WHERE eacode='" + eacode + "' and hcn='" + hcn + "' and shsn='" + shsn + "' order by LINENO*1", function(err,rows){
		if (err) {
              console.log("Error Selecting : %s ",err );
		}
		res.send(rows);
		
		// rows.forEach(function (row) {
			// res.send(row);
        // });
     
	});	
};	

exports.status = function(req, res){
	var obj = {};
	var eacode = req.body.eacode;
	var hcn = req.body.hcn;
	var shsn = req.body.shsn;
	  db3.all("SELECT * from f60 WHERE eacode='" + eacode + "' and hcn='" + hcn + "' and shsn='" + shsn + "'", function(err,rows){
		if (err) {
              console.log("Error Selecting : %s ",err );
		}
		res.send(rows);
	});	
};	

exports.update = function(req, res){
	
	db3.run('UPDATE f63 SET LINENO = "'+req.body.LINENO+'" , MEALCD = "'+req.body.MEALCD+'" , WRCODE = "'+req.body.WRCODE+'" , RFCODE = "'+req.body.RFCODE+'" , FOODCODE = "'+req.body.FOODCODE+'" , FOODEX = "'+req.body.FOODEX+'" , FOODDESC = "'+req.body.FOODDESC+'" , FOODWEIGHT = "'+req.body.FOODWEIGHT+'" , RCC = "'+req.body.RCC+'" , CMC = "'+req.body.CMC+'" , SUPCODE = "'+req.body.SUPCODE+'" , SRCCODE = "'+req.body.SRCCODE+'" , OTH_SRC = "'+req.body.OTH_SRC+'" , PW_WGT = "'+req.body.PW_WGT+'" , PW_RCC = "'+req.body.PW_RCC+'" , PW_CMC = "'+req.body.PW_CMC+'" , PURCODE = "'+req.body.PURCODE+'" , GO_WGT = "'+req.body.GO_WGT+'" , GO_RCC = "'+req.body.GO_RCC+'" , GO_CMC = "'+req.body.GO_CMC+'" , LO_WGT = "'+req.body.LO_WGT+'" , LO_RCC = "'+req.body.LO_RCC+'" , LO_CMC = "'+req.body.LO_CMC+'" , UNITCOST = "'+req.body.UNITCOST+'" , UNITWGT = "'+req.body.UNITWGT+'" , CLEAN = "'+req.body.CLEAN+'" , DATEENC = "'+req.body.DATEENC+'" , status = "'+req.body.status+'" , BRANDNAME = "'+req.body.BRANDNAME+'" , MAINIGNT = "'+req.body.MAINIGNT+'" , BRANDCODE = "'+req.body.BRANDCODE+'" , FOOD_ITEM = "'+req.body.FOOD_ITEM+'" , FOODITEM = "'+req.body.FOODITEM+'" , DESCRIPTION = "'+req.body.DESCRIPTION+'" , DATE_EDIT = "'+req.body.DATE_EDIT+'" , UNIT = "'+req.body.UNIT+'"  where id = "'+req.body.id+'"', function(err) {
	if(err)  { res.send('err'); }
		else res.send('/')
	});


};

exports.updatestatus = function(req, res){
	
	db3.all("SELECT * from f60 WHERE eacode='" + req.body.eacode + "' and hcn='" + req.body.hcn + "' and shsn='" + req.body.shsn + "'", function(err,rows){
	if(rows == '') {
			db3.run('INSERT OR IGNORE INTO f60 (eacode, hcn, shsn, '+req.body.name+') values ("'+req.body.eacode+'", "'+req.body.hcn+'", "'+req.body.shsn+'", "'+req.body.val+'")');
	}
	else {
		db3.run('UPDATE f60 SET ' + req.body.name + ' = "' + req.body.val + '" where eacode = "' + req.body.eacode + '" and hcn = "' + req.body.hcn + '" and shsn = "' + req.body.shsn + '"',function(err) {
	if(err)  { res.send('err'); }
		else res.send('/')
	});
		
	}
 
	});

};

exports.save = function(req, res){
	
	db3.run('INSERT INTO f63 (eacode, hcn, shsn, LINENO, MEALCD, WRCODE, RFCODE, FOODCODE, FOODEX, FOODDESC, FOODWEIGHT, RCC, CMC, SUPCODE, SRCCODE, OTH_SRC, PW_WGT, PW_RCC, PW_CMC, PURCODE, GO_WGT, GO_RCC, GO_CMC, LO_WGT, LO_RCC, LO_CMC, UNITCOST, UNITWGT, CLEAN, DATEENC, status, BRANDNAME, MAINIGNT, BRANDCODE, FOOD_ITEM, FOODITEM, DESCRIPTION, DATE_EDIT, UNIT) VALUES ( "'+req.body.eacode+'", "'+req.body.hcn+'", "'+req.body.shsn+'", "'+req.body.LINENO+'", "'+req.body.MEALCD+'", "'+req.body.WRCODE+'", "'+req.body.RFCODE+'", "'+req.body.FOODCODE+'", "'+req.body.FOODEX+'", "'+req.body.FOODDESC+'", "'+req.body.FOODWEIGHT+'", "'+req.body.RCC+'", "'+req.body.CMC+'", "'+req.body.SUPCODE+'", "'+req.body.SRCCODE+'", "'+req.body.OTH_SRC+'", "'+req.body.PW_WGT+'", "'+req.body.PW_RCC+'", "'+req.body.PW_CMC+'", "'+req.body.PURCODE+'", "'+req.body.GO_WGT+'", "'+req.body.GO_RCC+'", "'+req.body.GO_CMC+'", "'+req.body.LO_WGT+'", "'+req.body.LO_RCC+'", "'+req.body.LO_CMC+'", "'+req.body.UNITCOST+'", "'+req.body.UNITWGT+'", "'+req.body.CLEAN+'", "'+req.body.DATEENC+'", "'+req.body.status+'", "'+req.body.BRANDNAME+'", "'+req.body.MAINIGNT+'", "'+req.body.BRANDCODE+'", "'+req.body.FOOD_ITEM+'", "'+req.body.FOODITEM+'", "'+req.body.DESCRIPTION+'", "'+req.body.DATE_EDIT+'", "'+req.body.UNIT+'")', function (err){
	if(err)  { res.send('err'); }
		else res.send('/')
	});

};



exports.fic = function(req, res){
	var obj = [];
	
	var input = req.body.fic;
	if (input  == "") {
		res.send("nodata");
	}
	else
	{

	db3.all("SELECT * FROM xfctx2017 WHERE foodcode LIKE '%"+ input +"%' or fooddesc like '%"+ input +"%' LIMIT 5", function(err,rows){
	
	
	for (var i in rows) 
		{
			obj.push(rows[i]);	
		
		}
		    res.send(obj);
		});
	}
};

exports.ficget = function(req, res){
	var obj = [];
	
	var input = req.body.fic;
	if (input  == "") {
		res.send("nodata");
	}
	else
	{

	db3.all("SELECT * FROM xfctx2017 WHERE foodcode LIKE '%"+ input +"%' or fooddesc like '%"+ input +"%' LIMIT 15", function(err,rows){
	
	var values = [];
	var col = [];

	
	
	for (var i in rows) 
		{
			
			obj.push(rows[i]);	
		
		}
		    res.send(obj);
		});
	}
};









