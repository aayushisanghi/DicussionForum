
const express = require('express');
const path = require('path');
const app = new express();
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
const sqlite3 = require('sqlite3').verbose();
const url = require('url')
const queryString = require('query-string');
const cors = require('cors')
app.use(cors())
cors({credentials:true,origin:true})
app.all('/*',function(req,res,next){
  res.header("Access-Control-Allow-Origin","*");
  res.header("Access-Control-Allow-Headers","X-Requested-With");
  next();
});
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
app.use(bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 


app.post("/api/v1/login", function(request, response){
	db = new sqlite3.Database('database.db', (err) => {
    if (err) {
     console.log(err.message);
    }
    console.log('Connected to the database.');
    db.all("SELECT * FROM users where username=?",[request.body.username],function(err,row){
        console.log(row)
      if(row.length==1){
      	if(row['password'] == request.body.password){
      		console.log("logged in successfully");
      		response.status(200).json({});
      	}
      }
      else if(row.length==0)
      {
        console.log("invalid uname");
        response.status(401).json({});
      }
      else
        response.status(400).json({});
    });
});
});

app.post("/api/v1/signup", function(request, response){

});

app.delete("api/v1/userdelete", function(request, response){

});

app.post("api/v1/user/roles", function(request,response){

});

app.get("api/v1/domains", function(request, response){

});

app.post("api/v1/interests", function(request, response){

});

app.get("api/v1/questions/:domain", function(request,response){

});

app.get("api/v1/answers", function(request,response){

});

app.post("api/v1/questions/report", function(request,response){

});

app.post("api/v1/questions/status", function(request,response){

});

app.post("api/v1/questions", function(request,response){

});

app.post("api/v1/questions/correct", function(request,response){

});

app.post("api/v1/answers", function(request, response){

});

app.delete("api/v1/answers/:id", function(request,response){

});

app.delete("api/v1/questions/:id", function(request,response){

});

app.post("api/v1/questions/upvote", function(request, response){

});

app.post("api/v1/answers/upvote", function(request, response){

});

app.listen(3000, () => console.log('Listening on 3000'));