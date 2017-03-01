var express = require('express');
var app = express();
var fs = require("fs");
var path    = require("path");

var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(express.static(__dirname));

var busboy = require('connect-busboy');
app.use(busboy());


//upload the image for the imployee file, and return the image URL
app.post('/api/file-upload', function(req, res) {
    var fstream;
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename) {
        console.log("Uploading: " + filename);
        var imagePath='/uploads/' + filename ;
        fstream = fs.createWriteStream(__dirname + imagePath);
        file.pipe(fstream);
        fstream.on('close', function () {

            res.end(JSON.stringify({"imagePath":imagePath}));
        });
    });
});


//return the index page
app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
});


//return all the data about the employees
app.get('/api/employees', function (req, res) {
   fs.readFile( __dirname + "/" + "employees.json", 'utf8', function (err, data) {
       res.end( data );
   });
})

//add employee to employee json file
app.post('/api/addEmployee', function (req, res) {
  var employee = req.body;
   //First read existing users.
   fs.readFile( __dirname + "/" + "employees.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       employee._id=new Date().getUTCMilliseconds() ;
       data.push(employee);
       fs.writeFile( __dirname + "/" + "employees.json", JSON.stringify( data ), "utf8", function (err) {
         if (err) {
            return console.error(err);
         }
       } );
       res.end( JSON.stringify(data));
   });
})

//get tthe employee id
// and delete the employee from the employee json file
app.delete('/api/deleteEmployee/:_id', function (req, res) {
  var id=req.params._id ;
   //First read existing users.
   fs.readFile( __dirname + "/" + "employees.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       console.log("oldData ", data);
      var newData=deleteElement(data, id);
      console.log("newData ", newData);
       fs.writeFile( __dirname + "/" + "employees.json", JSON.stringify( newData ), "utf8", function (err) {
         if (err) {
            return console.error(err);
         }
       } );
       res.end( JSON.stringify(newData));
   });

})

//update data employee
app.put('/api/updateEmployee', function (req, res) {
  var employee = req.body;
   //First read existing users.
   fs.readFile( __dirname + "/" + "employees.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
      var newData=updateEmployee(data, employee);
       fs.writeFile( __dirname + "/" + "employees.json", JSON.stringify( newData ), "utf8", function (err) {
         if (err) {
            return console.error(err);
         }
       } );
       res.end( JSON.stringify(newData));
   });
})

//loop throw the emoloyee and delete the Image
function deleteElement(employeesArray, id){
  for (var i = 0; i < employeesArray.length; i++) {
    if (employeesArray[i]._id == id)
      //removeImageFromImages(employeesArray[i].image_url);
      employeesArray.splice(i, 1);
  }
  return employeesArray;
}

//update the Employee json
function updateEmployee(employeesArray, employee) {
  for (var i = 0; i < employeesArray.length; i++) {
    if (employeesArray[i]._id == employee._id)
      employeesArray[i]=employee;
  }
  return employeesArray;
}

//remove the Image from image files
function removeImageFromImages(imgUrl){
    fs.unlink(__dirname+imgUrl, (err) => {
          if (err) throw err;
        
        console.log('successfully deleted imgUrl');
  });

}
//naje
app.get('/uploadForm',function(req,res){
  res.sendFile(path.join(__dirname+'/uploadForm.html'));
});







var server = app.listen(8000, function () {

   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
})
