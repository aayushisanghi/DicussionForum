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
//     rating INTEGER\
//     )');

// db.run(' CREATE TABLE domains(\
//     domain TEXT PRIMARY KEY)');  

// db.run(' CREATE TABLE teacher_role(\
//     username TEXT PRIMARY KEY)');  

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
//     created DATETIME,\
//     FOREIGN KEY(domain) REFERENCES domains(domain),\
//     FOREIGN KEY(username) REFERENCES users(username)\
//     )');

// db.run('CREATE TABLE answers(\
//     aid INTEGER PRIMARY KEY,\
//     qid INTEGER,\
//     answer BLOB,\
//     upvotes INTEGER,\
//     created DATETIME,\
//     username TEXT,\
//     type TEXT,\
//     correct INTEGER CHECK(correct == 0 || correct == 1),\
//     FOREIGN KEY(qid) REFERENCES questions(qid),\
//     FOREIGN KEY(username) REFERENCES users(username)\
//     )')

// db.run('CREATE TABLE comments(\
//     cid INTEGER PRIMARY KEY,\
//     aid INTEGER,\
//     comment TEXT,\
//     created DATETIME,\
//     username TEXT,\
//     FOREIGN KEY(aid) REFERENCES answers(aid),\
//     FOREIGN KEY(username) REFERENCES users(username)\
//     )')

// USERS
// db.run("INSERT INTO users(username,password,firstname,lastname,role,rating) VALUES('Akshara','akshS','Akshara','Sivam','Student',5)")
// db.run("INSERT INTO users(username,password,firstname,lastname,role,rating) VALUES('Akshari','akshN','Akshari','Nataraj','Student',4)")
// db.run("INSERT INTO users(username,password,firstname,lastname,role,rating) VALUES('Aishwarya','aishS','Aishwarya','Sreedas','Student',5)")
// db.run("INSERT INTO users(username,password,firstname,lastname,role,rating) VALUES('Aayushi','aayuS','Aayushi','Sanghi','Student',4)")
// db.run("INSERT INTO users(username,password,firstname,lastname,role,rating) VALUES('Amar','amarA','Amar','Ananth','Student',3)")
// db.run("INSERT INTO users(username,password,firstname,lastname,role,rating) VALUES('Ananth','anan','Ananth','Koppar','Teacher',5)")
// db.run("INSERT INTO users(username,password,firstname,lastname,role,rating) VALUES('Shylaja','Shylaja','Shylaja','S','Teacher',4)")
// db.run("INSERT INTO users(username,password,firstname,lastname,role,rating) VALUES('Abhishek','abhiS','Abhishek','Sinha','Moderator',4)")
// db.run("INSERT INTO users(username,password,firstname,lastname,role,rating) VALUES('Aditya','adit','Aditya','Pandey','Moderator',5)")

// DOMAINS
// db.run("INSERT INTO domains(domain) VALUES('DataScience')")
// db.run("INSERT INTO domains(domain) VALUES('MachineLearning')")
// db.run("INSERT INTO domains(domain) VALUES('WebTechnology')")
// db.run("INSERT INTO domains(domain) VALUES('DataAnalytics')")
// db.run("INSERT INTO domains(domain) VALUES('BigData')")

// QUESTIONS
// db.run("INSERT INTO questions(qid,domain,question,username,status,upvotes,created) VALUES(1,'DataScience','What is data science?','Akshara',0,0,datetime())")
// db.run("INSERT INTO questions(qid,domain,question,username,status,upvotes,created) VALUES(2,'DataScience','What does DELETE mean?','Akshari',0,0,datetime())")
// db.run("INSERT INTO questions(qid,domain,question,username,status,upvotes,created) VALUES(3,'DataScience','What does TRUNCATE mean?','Aishwarya',0,0,datetime())")
// db.run("INSERT INTO questions(qid,domain,question,username,status,upvotes,created) VALUES(4,'MachineLearning','What is machine learning?','Aayushi',0,0,datetime())")
// db.run("INSERT INTO questions(qid,domain,question,username,status,upvotes,created) VALUES(5,'MachineLearning','What are the main aspects of machine learning?','Amar',0,0,datetime())")
// db.run("INSERT INTO questions(qid,domain,question,username,status,upvotes,created) VALUES(6,'MachineLearning','What is neural network?','Akshara',0,0,datetime())")
// db.run("INSERT INTO questions(qid,domain,question,username,status,upvotes,created) VALUES(7,'WebTechnology','What is webtechnology?','Akshari',0,0,datetime())")
// db.run("INSERT INTO questions(qid,domain,question,username,status,upvotes,created) VALUES(8,'WebTechnology','What are the core languages of web technology?','Aishwarya',0,0,datetime())")
// db.run("INSERT INTO questions(qid,domain,question,username,status,upvotes,created) VALUES(9,'WebTechnology','What does SQL mean?','Aayushi',0,0,datetime())")
// db.run("INSERT INTO questions(qid,domain,question,username,status,upvotes,created) VALUES(10,'DataAnalytics','What is Data Analytics?','Amar',0,0,datetime())")
// db.run("INSERT INTO questions(qid,domain,question,username,status,upvotes,created) VALUES(11,'DataAnalytics','What are the different types of Data analytics?','Akshara',0,0,datetime())")
// db.run("INSERT INTO questions(qid,domain,question,username,status,upvotes,created) VALUES(12,'DataAnalytics','Difference between data science and data analytics?','Akshari',0,0,datetime())")
// db.run("INSERT INTO questions(qid,domain,question,username,status,upvotes,created) VALUES(13,'BigData','What is Big data?','Aishwarya',0,0,datetime())")
// db.run("INSERT INTO questions(qid,domain,question,username,status,upvotes,created) VALUES(14,'BigData','What are the main aspects of Big data?','Aayushi',0,0,datetime())")
// db.run("INSERT INTO questions(qid,domain,question,username,status,upvotes,created) VALUES(15,'BigData','What is hadoop?','Amar',0,0,datetime())")


// db.run("DROP TABLE answers")
// // ANSWERS
// db.run("INSERT INTO answers(aid,qid,answer,upvotes,created,username,type,correct) VALUES(1,1,'https://www.youtube.com/embed/L7CdHnuR4pE',0,datetime(),'Ananth','video','0')")
// db.run("INSERT INTO answers(aid,qid,answer,upvotes,created,username,type,correct) VALUES(2,2,'https://image.slidesharecdn.com/startingdatasciencewithkaggle-170626100908/95/starting-data-science-with-kagglecom-16-638.jpg?cb=1524777727',0,datetime(),'Shylaja','image','0')")
// db.run("INSERT INTO answers(aid,qid,answer,upvotes,created,username,type,correct) VALUES(3,3,'Truncate is the process of limiting consideration or anaylsis to data that meet certain criteria. It can also be elimination of digits beyond a certain number of places past the decimal.',0,datetime(),'Ananth','text','0')")
// db.run("INSERT INTO answers(aid,qid,answer,upvotes,created,username,type,correct) VALUES(4,4,'https://miro.medium.com/max/2796/1*FUZS9K4JPqzfXDcC83BQTw.png',0,datetime(),'Shylaja','image','0')")
// db.run("INSERT INTO answers(aid,qid,answer,upvotes,created,username,type,correct) VALUES(5,5,'The key aspects of machine learning are - decision trees,graphical models, neural networks, support vector machines, instances, set of rules',0,datetime(),'Ananth','text','0')")
// db.run("INSERT INTO answers(aid,qid,answer,upvotes,created,username,type,correct) VALUES(6,6,'A neural network is a series of algorithms that endeavors to recognize underlying relationships in a set of data through a process that mimics the way the human brain operates. In this sense, neural networks refer to systems of neurons, either organic or artificial in nature.',0,datetime(),'Shylaja','text','0')")
// db.run("INSERT INTO answers(aid,qid,answer,upvotes,created,username,type,correct) VALUES(7,7,'Web technology refers to the means by which computers communicate with each other using markup languages and multimedia packages. It gives us a way to interact with hosted information, like websites. Web technology involves the use of hypertext markup language (HTML) and cascading style sheets (CSS).',0,datetime(),'Ananth','text','0')")
// db.run("INSERT INTO answers(aid,qid,answer,upvotes,created,username,type,correct) VALUES(8,8,'The core languages of web technology are- HTML5(hyper text makeup language) CSS(cascading style sheets) and JavaScript',0,datetime(),'Shylaja','Text','0')")
// db.run("INSERT INTO answers(aid,qid,answer,upvotes,created,username,type,correct) VALUES(9,9,'https://www.youtube.com/embed/xJImtdopN7Y',0,datetime(),'Ananth','video','0')")
// db.run("INSERT INTO answers(aid,qid,answer,upvotes,created,username,type,correct) VALUES(10,10,'https://www.youtube.com/embed/4tp1LQtudNw',0,datetime(),'Shylaja','video','0')")
// db.run("INSERT INTO answers(aid,qid,answer,upvotes,created,username,type,correct) VALUES(11,11,'The different types of data anayltics are Descriptive analysis, Diagnostic anaylysis,Pridictive analysis, casual analysis, mechanistic analysis.',0,datetime(),'Ananth','text','0')")
// db.run("INSERT INTO answers(aid,qid,answer,upvotes,created,username,type,correct) VALUES(12,12,'the major difference being the scope. ... Data science produces broader insights that concentrate on which questions should be asked, while big data analytics emphasizes discovering answers to questions being asked',0,datetime(),'Shylaja','text','0')")
// db.run("INSERT INTO answers(aid,qid,answer,upvotes,created,username,type,correct) VALUES(13,13,'https://www.youtube.com/embed/eVSfJhssXUA',0,datetime(),'Ananth','video','0')")
// db.run("INSERT INTO answers(aid,qid,answer,upvotes,created,username,type,correct) VALUES(14,14,'https://qph.fs.quoracdn.net/main-qimg-a4e4bdd9a23bb0ecd711dd7e30f6c946',0,datetime(),'Shylaja','image','0')")
// db.run("INSERT INTO answers(aid,qid,answer,upvotes,created,username,type,correct) VALUES(15,15,'Hadoop is an open-source software framework for storing data and running applications on clusters of commodity hardware. It provides massive storage for any kind of data, enormous processing power and the ability to handle virtually limitless concurrent tasks or jobs.',0,datetime(),'Ananth','text','0')")


// // COMMENTS
// db.run("INSERT INTO comments(cid,aid,comment,created,username) VALUES(1,1,'Can data science deal with structured and unstructured data?',datetime(),'Akshara')")
// db.run("INSERT INTO comments(cid,aid,comment,created,username) VALUES(2,1,'Yes, it can.',datetime(),'Akshari')")
// db.run("INSERT INTO comments(cid,aid,comment,created,username) VALUES(3,2,'Delete is used to remove the outliers ?',datetime(),'Aishwarya')")
// db.run("INSERT INTO comments(cid,aid,comment,created,username) VALUES(4,3,'Will using truncate help in making the data set better?',datetime(),'Aayushi')")
// db.run("INSERT INTO comments(cid,aid,comment,created,username) VALUES(5,3,'Yes, it does.',datetime(),'Amar')")
// db.run("INSERT INTO comments(cid,aid,comment,created,username) VALUES(6,4,'Machine learning is a subset of AI?',datetime(),'Akshara')")
// db.run("INSERT INTO comments(cid,aid,comment,created,username) VALUES(7,5,'Is random forest also included into types of machine learning?',datetime(),'Akshari')")
// db.run("INSERT INTO comments(cid,aid,comment,created,username) VALUES(8,5,'Yes, it does.',datetime(),'Aishwarya')")
// db.run("INSERT INTO comments(cid,aid,comment,created,username) VALUES(9,6,'So neural networks are a set of algorithms.',datetime(),'Aayushi')")
// db.run("INSERT INTO comments(cid,aid,comment,created,username) VALUES(10,7,'Does web techonology also include JavaScript?',datetime(),'Amar')")
// db.run("INSERT INTO comments(cid,aid,comment,created,username) VALUES(11,7,'yes, it does.',datetime(),'Akshara')")
// db.run("INSERT INTO comments(cid,aid,comment,created,username) VALUES(12,8,'Is Xml also included?',datetime(),'Akshari')")
// db.run("INSERT INTO comments(cid,aid,comment,created,username) VALUES(13,9,'Is the full form of sql Structured Query Language?',datetime(),'Aishwarya')")
// db.run("INSERT INTO comments(cid,aid,comment,created,username) VALUES(14,9,'Yes, it is.',datetime(),'Aayushi')")
// db.run("INSERT INTO comments(cid,aid,comment,created,username) VALUES(14,10,'Is cleansing also included into data analytics?',datetime(),'Amar')")
// db.run("INSERT INTO comments(cid,aid,comment,created,username) VALUES(16,11,'Do each the types offer different insight?',datetime(),'Akshara')")
// db.run("INSERT INTO comments(cid,aid,comment,created,username) VALUES(17,11,'yes, it does.',datetime(),'Akshari')")
// db.run("INSERT INTO comments(cid,aid,comment,created,username) VALUES(18,12,'Is data science or data analytics better',datetime(),'Aishwarya')")
// db.run("INSERT INTO comments(cid,aid,comment,created,username) VALUES(19,13,'Does Big data deal with structred and unstructured data?',datetime(),'Aayushi')")
// db.run("INSERT INTO comments(cid,aid,comment,created,username) VALUES(20,13,'yes, it does.',datetime(),'Amar')")
// db.run("INSERT INTO comments(cid,aid,comment,created,username) VALUES(21,14,'Does volume matter the most?',datetime(),'Akshara')")
// db.run("INSERT INTO comments(cid,aid,comment,created,username) VALUES(22,15,'Can mapreduce programming model be used ?',datetime(),'Akshari')")
// db.run("INSERT INTO comments(cid,aid,comment,created,username) VALUES(23,15,'Yes, it can be used.',datetime(),'Aishwarya')")


// INTERESTS
// db.run("INSERT INTO interests(username,interest) VALUES('Akshara','DataScience')")
// db.run("INSERT INTO interests(username,interest) VALUES('Akshara','MachineLearning')")
// db.run("INSERT INTO interests(username,interest) VALUES('Akshari','DataScience')")
// db.run("INSERT INTO interests(username,interest) VALUES('Akshari','MachineLearning')")
// db.run("INSERT INTO interests(username,interest) VALUES('Aishwarya','WebTechnology')")
// db.run("INSERT INTO interests(username,interest) VALUES('Aishwarya','DataAnalytics')")
// db.run("INSERT INTO interests(username,interest) VALUES('Aayushi','WebTechnology')")
// db.run("INSERT INTO interests(username,interest) VALUES('Aayushi','DataAnalytics')")
// db.run("INSERT INTO interests(username,interest) VALUES('Amar','BigData')")
// db.run("INSERT INTO interests(username,interest) VALUES('Amar','DataScience')")
// db.run("INSERT INTO interests(username,interest) VALUES('Ananth','BigData')")
// db.run("INSERT INTO interests(username,interest) VALUES('Ananth','DataScience')")
// db.run("INSERT INTO interests(username,interest) VALUES('Shylaja','MachineLearning')")
// db.run("INSERT INTO interests(username,interest) VALUES('Shylaja','WebTechnology')")
// db.run("INSERT INTO interests(username,interest) VALUES('Abhishek','MachineLearning')")
// db.run("INSERT INTO interests(username,interest) VALUES('Abhishek','WebTechnology')")
// db.run("INSERT INTO interests(username,interest) VALUES('Aditya','DataAnalytics')")
// db.run("INSERT INTO interests(username,interest) VALUES('Aditya','BigData')")



// db.run("INSERT INTO teacher_role(username) VALUES('Ananth')")
// db.run("INSERT INTO teacher_role(username) VALUES('Shylaja')")
// db.run("INSERT INTO teacher_role(username) VALUES('Vinay')")
// db.run("INSERT INTO teacher_role(username) VALUES('Vidhu')")
// db.run("INSERT INTO teacher_role(username) VALUES('Raghu')")
// db.run("INSERT INTO teacher_role(username) VALUES('teacher')")



// db.run("INSERT INTO questions(qid,domain,question,username,status,upvotes,created) VALUES(2,'computerscience','what is cs', 'abc',0,0,datetime())")
// db.run("INSERT INTO users(username, password, firstname, lastname, role, rating) VALUES('Akshara_S','123', 'cat','dog','Teacher',3)")
// db.run("INSERT INTO domains(domain) VALUES("DataScience")")

// db.run("INSERT INTO answers(aid,qid,answer,upvotes,created,username,type,correct) VALUES(4,2,'https://www.bigw.com.au/medias/sys_master/images/images/hf3/hd4/12986145898526.jpg',0,datetime(),'Dobby','image',0)")
// db.run("INSERT INTO answers(aid,qid,answer,upvotes,created,username,type,correct) VALUES(5,2,'https://www.youtube.com/embed/EngW7tLk6R8',0,datetime(),'Dobby','video',0)")
// db.run("INSERT INTO answers(aid,qid,answer,upvotes,created,username,type,correct) VALUES(1,2,'abc def ghi hij',0,datetime(),'Dobby','text',0)")






// db.run('ALTER TABLE users DROP COLUMN image')
// db.run("INSERT INTO domains(domain) VALUES('computerscience')")
// db.run("INSERT INTO questions(qid,domain,question,username,status,upvotes) VALUES(2,'computerscience','what is cs', 'abc',0,0)")
// db.run("INSERT INTO users(username, password, firstname, lastname, role, rating, image) VALUES('Akshara_S','123', 'cat','dog','Teacher',3,110001)")
// db.run('ALTER TABLE comments ADD COLUMN created datetime');
// db.run('ALTER TABLE answers ADD COLUMN created datetime');
// db.run('ALTER TABLE questions ADD COLUMN created datetime');
// db.run('ALTER TABLE answers ADD COLUMN created datetime');
// db.run('DROP TABLE answers')
// db.run('DROP TABLE comments')
// db.run('DROP TABLE questions')
// db.run('DROP TABLE users')
// db.run('DROP TABLE interests')
// db.run('DROP TABLE domains')
// db.run("INSERT INTO comments(cid,aid,comment,created,username) VALUES(1,4,'nice',datetime(),'Akshara_S')");
// db.run("INSERT INTO comments(cid,aid,comment,created,username) VALUES(2,5,'smart',datetime(),'Akshara_S')");
// db.run("INSERT INTO answers(aid,qid,answer,upvotes,created,username,type,correct) VALUES(4,2,'https://www.bigw.com.au/medias/sys_master/images/images/hf3/hd4/12986145898526.jpg',0,datetime(),'Dobby','image',0)")
// db.run("INSERT INTO answers(aid,qid,answer,upvotes,created,username,type,correct) VALUES(5,2,'https://www.youtube.com/embed/EngW7tLk6R8',0,datetime(),'Dobby','video',0)")
// db.run("INSERT INTO answers(aid,qid,answer,upvotes,created,username,type,correct) VALUES(1,2,'abc def ghi hij',0,datetime(),'Dobby','text',0)")
// db.run("UPDATE questions SET status = 0 WHERE qid=2")
// db.run("UPDATE answers SET correct = 0 WHERE aid=1")
// db.run("UPDATE answers SET correct = 0 WHERE aid=4")
// db.run("UPDATE answers SET correct = 0 WHERE aid=5")
// db.run("UPDATE answers SET correct = 0 WHERE aid=3")
// db.run("UPDATE answers SET correct = 0 WHERE aid=2")

// db.run("DELETE FROM users WHERE username='Vidhu'")
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

   sql = 'SELECT * FROM teacher_role';
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
