const express = require('express');
const app = new express();
const sqlite3 = require('sqlite3').verbose();

// open the database
let db = new sqlite3.Database('./database.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE , (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the database.');
});

// db.run('CREATE TABLE users(\
//     username TEXT PRIMARY KEY,\
//     password TEXT,\
//     firstname TEXT,\
//     lastname TEXT,\
//     role TEXT,\
//     rating INTEGER,\
//     image BLOB\
//     )');

// db.run(' CREATE TABLE domains(\
//     domain TEXT PRIMARY KEY)');   

// db.run(' CREATE TABLE interests(\
//     username TEXT,\
//     interest TEXT,\
//     FOREIGN KEY(username) REFERENCES users(username), \
//     FOREIGN KEY(interest) REFERENCES domains(domain) \
//     )');

// db.run(' CREATE TABLE questions(\
//     qid INTEGER PRIMARY KEY,\
//     domain TEXT,\
//     question TEXT,\
//     username TEXT,\
//     status INTEGER CHECK(status == 0 || status == 1),\
//     upvotes INTEGER,\
//     FOREIGN KEY(domain) REFERENCES domains(domain),\
//     FOREIGN KEY(username) REFERENCES users(username)\
//     )');

// db.run('CREATE TABLE answers(\
//     aid INTEGER PRIMARY KEY,\
//     qid INTEGER,\
//     answer BLOB,\
//     upvotes INTEGER,\
//     correct INTEGER CHECK(correct == 0 || correct == 1),\
//     FOREIGN KEY(qid) REFERENCES questions(qid)\
//     )')

// db.run('CREATE TABLE comments(\
//     cid INTEGER PRIMARY KEY,\
//     aid INTEGER,\
//     comment TEXT,\
//     FOREIGN KEY(aid) REFERENCES answers(aid)\
//     )')
// 
// db.run('DROP TABLE categories');
// db.run('CREATE TABLE categories(category TEXT PRIMARY KEY)');
// db.run('CREATE TABLE user_info(\
//   name TEXT PRIMARY KEY,\
//    password TEXT)')
// console.log('table created');

// db.run('INSERT INTO acts(id,username,timest,caption,category,upvotes,imgb64,valid) VALUES(?,?,?,?,?,?,?,?)',[2,'dobby','12-12-2018:34-45-12',"i am sleepy2",'Animal',0,'Abcdefghijkl',1],function(err){
//     if(err){
//       console.log(err)
//     }
//   })

// db.run('INSERT INTO user_info(name,password) VALUES(?,?)',["aayu","abcd"],function(err){
//   if(err)
//     console.log(err)
// })

// db.run('INSERT INTO categories(category) VALUES(?)',['oldagehomeservices'],function(err){
//   if(err)
//     console.log(err)
// })

// db.run('UPDATE acts SET timest=? WHERE id=?',['12-12-2012:10-23-11',1],(err)=>{
// 	if(err)
// 		console.log(err)
// 	else
// 		console.log('done')
// })

let sql = 'SELECT * FROM users';
 db.all(sql, [], (err, rows) => {
  if (err) {
    return console.error(err.message);
  }
  else{
    console.log(rows)
  }
  }); 

 sql = 'SELECT * FROM questions';
 db.all(sql, [], (err, rows) => {
  if (err) {
    return console.error(err.message);
  }
  else{
    console.log(rows)
  }
  }); 

 sql = 'SELECT * FROM answers';
 db.all(sql, [], (err, rows) => {
  if (err) {
    return console.error(err.message);
  }
  else{
    console.log(rows)
  }
  }); 

sql = 'SELECT * FROM comments';
  db.all(sql, [], (err, rows) => {
   if (err) {
     return console.error(err.message);
   }
   else{
     console.log(rows)
   }
   }); 
 
  sql = 'SELECT * FROM domains';
  db.all(sql, [], (err, rows) => {
   if (err) {
     return console.error(err.message);
   }
   else{
     console.log(rows)
   }
   }); 
 
  sql = 'SELECT * FROM interests';
  db.all(sql, [], (err, rows) => {
   if (err) {
     return console.error(err.message);
   }
   else{
     console.log(rows)
   }
   }); 

db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Close the database connection.');
});
