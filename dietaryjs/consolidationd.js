var fs = require('fs');
var path = require('path');
var sqlite3 = require('sqlite3').verbose();
db3 = new sqlite3.Database('foodconsumption.db');
var http = require('http');
var json2csv = require('json2csv');
const csv=require('csvtojson');
var multer= require('multer');
var upload = multer({ dest: 'uploads/' })
var Zip = require('node-7z'); // Name the class as you want! 
var unzip = require('unzip');
var easyzip = require('easy-zip');

function JSON2Sqlite(json,name,form_name){
   var col = [];
   var values =[];
   var  sql ="";
   var  rn = 0;
   var arr = name.split('_');

     for (var k in json){
            if(k=='id'){
                // console.log(sql);   
               if(col.length>0){
                    db3.all(sql  ,function(err,rows){
                      if(err) //console.log(err);
                       rn++;
                    
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
           if(col.length>0){
                  sql = "INSERT OR IGNORE INTO "+form_name+"("  + col.join(",") + ") VALUES('" +  values.join("','") + "');";
                   
                 db3.all(sql  ,function(err,rows){
                    if(err) console.log("Error number : " + err);
                                       rn++;
					console.log("INSERTED RECORD : "+form_name);
                });

				
                  col = [];
                  values = [];

             }
}

exports.extract =  function (req, res, next) {
	csvFilePath=req.file.path;
	
	fs.createReadStream(csvFilePath).pipe(unzip.Extract({ path: 'C:/dcs/consolidation' }));
};

exports.upload =  function (req, res, next) {

  var array_name = ['f11','f60','f61','f63','f71','f76'];
  var array_length = array_name.length;
  
  for(var i = 0 ; i< array_length ; i++){
  var name = array_name[i]+"_"+req.file.originalname.substring(0,req.file.originalname.length-8)+".csv";
  csvFilePath='C:/dcs/consolidation/'+array_name[i]+"_"+req.file.originalname.substring(0,req.file.originalname.length-8)+".csv";
	
  var form_name = array_name[i];
	
  csv_upload(name,form_name);
 
}
	
	res.write('<style>.one { opacity: 0; -webkit-animation: dot 1.3s infinite; -webkit-animation-delay: 0.0s; animation: dot 1.3s infinite; animation-delay: 0.0s; }.two { opacity: 0; -webkit-animation: dot 1.3s infinite; -webkit-animation-delay: 0.2s; animation: dot 1.3s infinite; animation-delay: 0.2s; }.three { opacity: 0; -webkit-animation: dot 1.3s infinite; -webkit-animation-delay: 0.3s; animation: dot 1.3s infinite; animation-delay: 0.3s; }@-webkit-keyframes dot { 0% { opacity: 0; } 50% { opacity: 0; } 100% { opacity: 1; } }@keyframes dot { 0% { opacity: 0; } 50% { opacity: 0; } 100% { opacity: 1; } }</style><body>');
	res.write('<div style="height: 200px;width: 400px;position: fixed;top: 50%;left: 50%;margin-top: -100px;margin-left: -200px;"><font size="7">Consolidating data Please Wait<span class="one">.</span><span class="two">.</span><span class="three">.</span></font> </div></body><script type="text/javascript"> window.location.href="/dietaryhome/";</script>');
res.end()

};

function csv_upload(name,form_name){
csv()
.fromFile(csvFilePath)
.on('json',(jsonObj)=>{
    JSON2Sqlite(jsonObj,name,form_name);
})
.on('done',(error)=>{
    console.log('Upload Success');
	
})
};