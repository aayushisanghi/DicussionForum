const express = require('express');
const path = require('path');
const app = new express();
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
const sqlite3 = require('sqlite3').verbose();
const url = require('url')
const queryString = require('query-string');
const cors = require('cors')
const dateTime = require('node-datetime');
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
//const axios = require('axios')
const fs = require('fs')

//QUESTIONS BASED ON DOMAINS
//USED
app.post("/api/v1/questions/interests", function(request,response){
  db = new sqlite3.Database('./database.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE , (err) => {
    if (err) {
     console.log(err.message);
    }
    });
  inter=request.body.interests;
  //console.log(inter.length)
  let sql = 'SELECT * FROM questions';
  db.all(sql, [], (err, rows) => {
    res={}
    var temp=0;
    for(let ctr=0;ctr<inter.length;ctr++){
    for(let i=0;i<rows.length;i++){
      if(rows[i]['domain'] == inter[ctr]){
        temp++;
        res[rows[i]['qid']]=[rows[i]['domain'],rows[i]['username'],rows[i]['status'],rows[i]['upvotes'],rows[i]['question'],rows[i]['created']];
      }
    }}
    if(temp==0){
      response.status(400).json({})
      }
    console.log("GET QUESTIONS") 
    response.json(res)
  })
  db.close((err) => {
  if (err) {
    return console.log(err.message);
  }
  console.log('Close the database connection.');
});
});

app.get("/api/v1/user/role/:user", function(request, response){
  db = new sqlite3.Database('database.db', (err) => {
    if (err) {
     console.log(err.message);
    }
    console.log('Connected to the database.');
  })
  username = request.params.user;
  res ={}
  db.all("SELECT * FROM users where username=?",[username],function(err,row){
    console.log(row)
    if(row.length>0){
      res["role"]=row[0]["role"]
      response.status(200).json(res);
    }
    else{
      response.status(204).json({});
    }
  })
  db.close((err) => {
    if (err) {
        return console.log(err.message);
    }
    console.log('Close the database connection.');
  });
})

//USED
app.get("/api/v1/questions/noninterests", function(request,response){
  db = new sqlite3.Database('./database.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE , (err) => {
    if (err) {
     console.log(err.message);
    }
    });
  //console.log(inter.length)
  let sql = 'SELECT * FROM questions';
  db.all(sql, [], (err, rows) => {
    res={}
    var temp=0;
    for(let i=0;i<rows.length;i++){
        temp++;
        res[rows[i]['qid']]=[rows[i]['domain'],rows[i]['username'],rows[i]['status'],rows[i]['upvotes'],rows[i]['question'],rows[i]['created']];
    }
    if(temp==0){
      response.status(400).json({})
      }
    console.log("GET QUESTIONS") 
    response.json(res)
  })
  db.close((err) => {
  if (err) {
    return console.log(err.message);
  }
  console.log('Close the database connection.');
});
});

//USED
app.get("/api/v1/questions/upvotes", function(request,response){
  db = new sqlite3.Database('./database.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE , (err) => {
    if (err) {
     console.log(err.message);
    }
    });
  //console.log(inter.length)
  let sql = 'SELECT * FROM questions ORDER BY upvotes DESC';
  db.all(sql, [], (err, rows) => {
    res={}
    tempobj = {}
    var temp=0;
    for(let i=0;i<rows.length;i++){
        console.log(rows[i])
        temp++;
        tempobj={}
        tempobj['question']=rows[i]['question']
        tempobj['qid']=rows[i]['qid']
        tempobj['upvotes']=rows[i]['upvotes']
        tempobj['username']=rows[i]['username']
        tempobj['status']=rows[i]['status']
        tempobj['domain']=rows[i]['domain']
        tempobj['created']=rows[i]['created']
        res[i]=tempobj
        // res[rows[i]['qid']]=[rows[i]['domain'],rows[i]['username'],rows[i]['status'],rows[i]['upvotes'],rows[i]['question']];
    }
    if(temp==0){
      response.status(400).json({})
      }
    console.log("GET QUESTIONS") 
    response.json(res)
    console.log("HEREEEE")
    // console.log(res)
  })
  db.close((err) => {
  if (err) {
    return console.log(err.message);
  }
  console.log('Close the database connection.');
});
});

//USED
app.get("/api/v1/questions/time", function(request,response){
  db = new sqlite3.Database('./database.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE , (err) => {
    if (err) {
     console.log(err.message);
    }
    });
  //console.log(inter.length)
  let sql = 'SELECT * FROM questions ORDER BY created DESC';
  db.all(sql, [], (err, rows) => {
    res={}
    tempobj = {}
    var temp=0;
    for(let i=0;i<rows.length;i++){
        console.log(rows[i])
        temp++;
        tempobj={}
        tempobj['question']=rows[i]['question']
        tempobj['qid']=rows[i]['qid']
        tempobj['upvotes']=rows[i]['upvotes']
        tempobj['username']=rows[i]['username']
        tempobj['status']=rows[i]['status']
        tempobj['domain']=rows[i]['domain']
        tempobj['created']=rows[i]['created']
        res[i]=tempobj
        // res[rows[i]['qid']]=[rows[i]['domain'],rows[i]['username'],rows[i]['status'],rows[i]['upvotes'],rows[i]['question']];
    }
    if(temp==0){
      response.status(400).json({})
      }
    console.log("GET QUESTIONS") 
    response.json(res)
    console.log("HEREEEE")
    // console.log(res)
  })
  db.close((err) => {
  if (err) {
    return console.log(err.message);
  }
  console.log('Close the database connection.');
});
});


//USED
app.get("/api/v1/questions/state", function(request,response){
  db = new sqlite3.Database('./database.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE , (err) => {
    if (err) {
     console.log(err.message);
    }
    });
  //console.log(inter.length)
  let sql = 'SELECT * FROM questions WHERE status=1';
  db.all(sql, [], (err, rows) => {
    res={}
    tempobj = {}
    var temp=0;
    for(let i=0;i<rows.length;i++){
        console.log(rows[i])
        temp++;
        tempobj={}
        tempobj['question']=rows[i]['question']
        tempobj['qid']=rows[i]['qid']
        tempobj['upvotes']=rows[i]['upvotes']
        tempobj['username']=rows[i]['username']
        tempobj['status']=rows[i]['status']
        tempobj['domain']=rows[i]['domain']
        tempobj['created']=rows[i]['created']
        res[i]=tempobj
        // res[rows[i]['qid']]=[rows[i]['domain'],rows[i]['username'],rows[i]['status'],rows[i]['upvotes'],rows[i]['question']];
    }
    if(temp==0){
      //response.status(400).json({})
      }
    console.log("GET QUESTIONS") 
    response.json(res)
    console.log("HEREEEESHHHHHHHHH")
    // console.log(res)
  })
  db.close((err) => {
  if (err) {
    return console.log(err.message);
  }
  console.log('Close the database connection.');
});
});

//11.POSTS QUESTIONS
//USED
// app.post("/api/v1/questions", function(request,response){
//   db = new sqlite3.Database('./database.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE , (err) => {
//     if (err) {
//      console.log(err.message);
//     }
//   });
//   qid=request.body.qid;
//   domain=request.body.domain;
//   question = request.body.question;
//   username= request.body.username;
//   created=request.body.created;
//   let sql = 'SELECT * FROM questions';
//   db.all(sql, [], (err, rows) => {
//     var flag=0;
//     for(let i=0;i<rows.length;i++){
//       if(rows[i]['qid'] == qid){
//         flag=1;
//         response.status(400).json({})
//       }
//     }
//     if(flag==0){
//       db.run('INSERT INTO questions(qid,domain,question,username,status,upvotes,created) VALUES(?,?,?,?,?,?,?)',[qid,domain,question,username,0,0,created],function(err1){
//         if(err1)
//           console.log(err1)
//         else{
//           fs.appendFile('questions.txt', question.substring(0,question.length-1)+"\n", function (err) {
//           if (err) throw err;
//            console.log('Saved!');
//           });
//           response.status(201).json({})
//         }
//       })
//     }
//     console.log("ASK A QUESTION") 
//   })
//   db.close((err) => {
//   if (err) {
//     return console.log(err.message);
//   }
//   console.log('Close the database connection.');
// });
// });


//15. DELETE QUESTIONS
//USED
app.delete("/api/v1/questions/:qid", function(request,response){
  db = new sqlite3.Database('database.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE , (err) => {
    if (err) {
     console.log(err.message);
    }
  });
//   var content;
//   fs.readFile('./userinfo', function read(err, data) {
//     if (err) {
//         throw err;
//     }
//     content = data;

//     // Invoke the next step here however you like
//     console.log(content);   // Put all of the code here (not the best solution)          // Or put the next step in a function and invoke it
// });
  // username="Akshara";
  qid=request.params.qid
  sql = 'SELECT * FROM questions WHERE qid=?'
      db.all(sql,[qid],(err,rows)=>{
        if(rows.length==0){
          //alert("Cannot delete")
          //response.status(400).send({})
        }
        else{
          sql = 'DELETE FROM questions WHERE qid=?'
          db.run(sql,[qid],(err)=>{
            //if(err)
              //console.log(err)
            
              response.send({})
            
          })
        }
      })
  console.log("DELETE QUESTIONS")
  db.close((err) => {
    if (err) {
      return console.log(err.message);
    }
  console.log('Close the database connection.');
  });
});

//16. UPVOTE QUESTIONS
//USED
app.post("/api/v1/questions/upvote", function(request, response){
    db = new sqlite3.Database('./database.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE , (err) => {
    if (err) {
     console.log(err.message);
    }
  });
  qid=request.body.qid;
  let sql = 'SELECT * FROM questions';
  db.all(sql, [], (err, rows) => {
    var temp=0
    var flag=0
    for(let i=0;i<rows.length;i++){
      if(rows[i]['qid'] == qid){
        flag=1;
        temp=rows[i]['upvotes']+1;
      }
    }
    if(flag==1){
    db.run('UPDATE questions SET upvotes = ? WHERE qid=?',[temp,qid],function(err1){
        if(err1)
          console.log(err1)
        else
          response.status(201).json({})
    })
  }
  else{
      response.status(400).send({})
    }
    console.log("UPVOTE A QUESTION") 
  })
  db.close((err) => {
  if (err) {
    return console.log(err.message);
  }
  console.log('Close the database connection.');
});
});

//6. GET INTEREST OF USER
//DONE
app.get("/api/v1/interests/:username", function(request, response){
  db = new sqlite3.Database('./database.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE , (err) => {
    if (err) {
     console.log(err.message);
    }
  });
  console.log("Get interests")
  user=request.params.username;
  let sql = 'SELECT interest i FROM interests where username=?';
  var flag=0;
  res={}
  console.log(user)
  db.all(sql, [user], (err, rows) => {
  if(rows.length==0){
        response.status(204).send({});
  }
  else{
  for(let i=0;i<rows.length;i++){
        res[rows[i]['i']]=0;
    }
    response.json(res);
  }
  })
  db.close((err) => {
  if (err) {
    return console.log(err.message);
  }
  console.log('Close the database connection.');
});
});

app.get("/api/v1/username/:user", function(request, response){
  db = new sqlite3.Database('database.db', (err) => {
    if (err) {
     console.log(err.message);
    }
    console.log('Connected to the database.');
  })
  username = request.params.user;
  db.all("SELECT * FROM users where username=?",[username],function(err,row){
    if(row.length>0){
      response.status(401).json({"exists":true});
    }
    else{
      response.status(200).json({"exists":false});
    }
  })
  db.close((err) => {
    if (err) {
        return console.log(err.message);
    }
    console.log('Close the database connection.');
  });
})

app.post("/api/v1/login", function(request, response){
  db = new sqlite3.Database('database.db', (err) => {
    if (err) {
     console.log(err.message);
    }
    console.log('Connected to the database.');
    db.all("SELECT * FROM users where username=?",[request.body.username],function(err,row){
        console.log(row)
      if(row.length==1){
        if(row[0]['password'] == request.body.password){
//           fs.writeFile("profile.txt",request.body.username+" "+request.body.password,(err) => {
//   if(err) throw err;
// })     
          console.log("logged in successfully");
          response.status(200).json({});
        }
        else{
          console.log("invalid password")
          response.status(401).json({});
        }
      }
      else if(row.length==0)
      {
        console.log("invalid uname");
        response.status(401).json({});
      }
      else
        response.status(401).json({});
    });
});
  db.close((err) => {
    if (err) {
        return console.log(err.message);
    }
    console.log('Close the database connection.');
    });
});


app.post("/api/v1/signup", function(request, response){
//all checks about username and password length to be done at front end
console.log(request.body);
//var interest = JSON.parse(JSON.stringify(request.body.interest));
var interest = request.body.interest
console.log("interest array "+interest[0])
  db = new sqlite3.Database('database.db', (err) => {
    if (err) {
     console.log(err.message);
    }
    console.log('Connected to the database.');
    db.all("SELECT * FROM users where username=?",[request.body.username],function(err,row){
        console.log("interest"+request.body.interest);
        console.log(row)
      if(row.length>=1){
          console.log("username already exists");
          response.status(409).json({}); //resource already exists
      }
      else if(row.length==0)
      {
        console.log("valid uname, can create account");
        var r = request.body.role;
        //console.log(r);
        db.run("INSERT INTO users VALUES('"+request.body.username+"','"+request.body.password+"','"+request.body.first_name+"','"+request.body.last_name+"','"+request.body.role+"',0)");
        fs.writeFile("profile.txt",request.body.username+" "+request.body.password,(err) => {
        if(err) throw err;
        })
        console.log("user inserted");
        for(let i=0;i<interest.length;i++){
          console.log("interest is "+ interest[i]);
          /*axios.post('http://localhost:3000/api/v1/interests', {
          username: request.body.username,
          interest: interest[i],
        })
        .then((res) => {
          console.log('statusCode:'+ res.statusCode)
          //console.log(res)
        })
        .catch((error) => {
          console.error(error)
        })*/
          db.run('INSERT INTO interests(username,interest) VALUES(?,?)',[request.body.username,interest[i]],function(err1){
          if(err1)
            console.log(err1)
          })
        }
        response.status(201).json({});
      }
      else
        response.status(400).json({});
    });
});
  db.close((err) => {
        if (err) {
          return console.log(err.message);
        }
        console.log('Close the database connection.');
        });
});


app.delete("/api/v1/userdelete", function(request, response){
  db = new sqlite3.Database('database.db', (err) => {
    if (err) {
     console.log(err.message);
    }
    console.log('Connected to the database.');
    db.all("SELECT * FROM users where username=?",[request.body.username],function(err,row){
        console.log(row)
      if(row.length==1){
          console.log("username exists, deleting");
          db.run("DELETE FROM users where username ='"+request.body.username+"'");
        console.log("user deleted");
          response.status(200).json({}); //deleted
      }
      else if(row.length==0)
      {
        console.log("uname does not exist");
        response.status(404).json({}); //404 not found
      }
      else
        response.status(400).json({}); //bad request
    });
});
  db.close((err) => {
    if (err) {
        return console.log(err.message);
    }
    console.log('Close the database connection.');
    });
});

//checks if teacher exists
app.get("/api/v1/user/teacher/:username", function(request,response){
  db = new sqlite3.Database('database.db', (err) => {
    if (err) {
     console.log(err.message);
    }
    console.log('Connected to the database.');
    db.all("SELECT * FROM teacher_role where username=?",[request.params.username],function(err,row){
      //console.log(row)

      if(row.length==1){
          console.log("valid teacher");
          response.status(200).json({}); //found
      }
      else if(row.length==0)
      {
        console.log("invalid, not a teacher");
        response.status(404).json({}); //404 not found
      }
      else
        response.status(400).json({}); //bad request
    });
});
  db.close((err) => {
    if (err) {
        return console.log(err.message);
    }
    console.log('Close the database connection.');
    });
});


//5. GETS THE DOMAINS
app.get("/api/v1/domains", function(request, response){
	db = new sqlite3.Database('./database.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE , (err) => {
    if (err) {
     console.log(err.message);
    }
    });
    rows={}
    let sql = 'SELECT domain d FROM domains';
    db.all(sql, [], (err, rows) => {
    	if(rows.length==0){
        	response.status(204).send({});
      	}
      	else{
        	res={}
        	for(let i =0;i<rows.length;i++){
          		res[rows[i]['d']]=0;
        	}
        console.log("GET DOMAINS")
        console.log(res)
        response.json(res)   
      	}
   	});
    db.close((err) => {
    if (err) {
      	return console.log(err.message);
    }
    console.log('Close the database connection.');
  	});
})



//6. GET INTEREST OF USER
app.get("/api/v1/interests", function(request, response){
  db = new sqlite3.Database('./database.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE , (err) => {
    if (err) {
     console.log(err.message);
    }
  });
  console.log("Get interests")
  user=request.body.username;
  let sql = 'SELECT interest i FROM interests where username=?';
  var flag=0;
  res={}
  console.log(user)
  db.all(sql, [user], (err, rows) => {
  if(rows.length==0){
        response.status(204).send({});
  }
  else{
  for(let i=0;i<rows.length;i++){
        res[rows[i]['i']]=0;
    }
    response.json(res);
  }
  })
  db.close((err) => {
  if (err) {
    return console.log(err.message);
  }
  console.log('Close the database connection.');
}); 
});


//6. POSTS INTEREST OF USER
app.post("/api/v1/interests", function(request, response){
 db = new sqlite3.Database('./database.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE , (err) => {
    if (err) {
     console.log(err.message);
    }
  });
  inter=request.body.interest;
  user=request.body.username;
  console.log("username "+user+"interest "+inter);
  let sql = 'SELECT * FROM interests';
  db.all(sql, [], (err, rows) => {
    var flag=0;
    for(let i=0;i<rows.length;i++){
      if(rows[i]['interest'] == inter && rows[i]['username']==user){
        flag=1;
        response.status(400).json({})
      }
    }
    if(flag==0){
      db.run('INSERT INTO interests(username,interest) VALUES(?,?)',[user,inter],function(err1){
        if(err1)
          console.log(err1)
        else
          response.status(201).json({})
      })

    }
    console.log("POST INTEREST "+ inter) 
  })
  db.close((err) => {
  if (err) {
    return console.log(err.message);
  }
  console.log('Close the database connection.');
});
});

//7. QUESTIONS BASED ON DOMAINS
app.get("/api/v1/questions/:domain", function(request,response){
	db = new sqlite3.Database('./database.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE , (err) => {
    if (err) {
     console.log(err.message);
    }
    });
    domain=request.params.domain
    rows={}
    temp=0
    let sql = 'SELECT * FROM questions';
    db.all(sql, [], (err, rows) => {
    	for(let i =0;i<rows.length;i++){
          		if(rows[i]['domain']==domain){
        			temp++
          		}
        }
    	if(temp==0){
        	response.status(204).send({});
      	}
      	else{
        	res={}
        	for(let i =0;i<rows.length;i++){
          		if(rows[i]['domain']==domain){
          			res[rows[i]['qid']]=rows[i]['question'];
          		}
        	}
        console.log("GET QUESTIONS")
        console.log(res)
        response.json(res)   
      	}
   	});
	db.close((err) => {
    	if (err) {
      		return console.log(err.message);
    	}
    	console.log('Close the database connection.');
  	});
});

//8. ANSWERS FOR A PARTICULAR QUESTION
app.get("/api/v1/answers/:qid", function(request,response){
  db = new sqlite3.Database('./database.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE , (err) => {
    if (err) {
     console.log(err.message);
    }
    });
    qid=request.params.qid
    rows={}
    let sql = 'SELECT * FROM answers WHERE qid=? ORDER BY correct, upvotes, created';
    db.all(sql, [qid], (err, rows) => {
      if(rows.length==0){
          response.status(204).send({});
        }
        else{
          res={}
          temp={}
          for(let i=0;i<rows.length;i++){
            temp={}
            temp['answer']=rows[i]['answer'];
            temp['username'] = rows[i]['username'];
            temp['type']=rows[i]['type']
            temp['id']=rows[i]['aid']
            temp['correct'] = rows[i]['correct']
            temp['upvotes'] = rows[i]['upvotes']
            res[i]=temp
          }
        console.log("GET ANSWERS")
        // console.log(res)
        response.json(res)   
        }
    });
  db.close((err) => {
      if (err) {
          return console.log(err.message);
      }
      console.log('Close the database connection.');
    });
});

//9. WHAT? 
/*app.post("api/v1/questions/report", function(request,response){

});*/

//10. VERIFIES IF QUESTION IS ANSWERED
app.post("/api/v1/questions/status", function(request,response){
  db = new sqlite3.Database('./database.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE , (err) => {
    if (err) {
     console.log(err.message);
    }
  });
  qid=request.body.qid;
  let sql = 'SELECT * FROM questions';
  db.all(sql, [], (err, rows) => {
    var flag=0;
    for(let i=0;i<rows.length;i++){
      if(rows[i]['qid'] == qid && rows[i]['status']==1){
        flag=1;
        response.status(400).json({})
      }
    }
    if(flag==0){
      db.run('UPDATE questions SET status = ? WHERE qid=?',[1,qid],function(err1){
        if(err1)
          console.log(err1)
        else
          response.status(201).json({})
      })

    }
    console.log("VERIFY A QUESTION") 
  })
  db.close((err) => {
  if (err) {
    return console.log(err.message);
  }
  console.log('Close the database connection.');
});
});


//12.VALIDATE ANSWERS 
app.post("/api/v1/questions/correct", function(request,response){
  db = new sqlite3.Database('./database.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE , (err) => {
    if (err) {
     console.log(err.message);
    }
  });
  aid=request.body.aid;
  qid = request.body.qid
  // console.log(qid,aid)
  answered = 0
  db.all("SELECT * FROM questions WHERE qid=?",[qid],(err, rows)=>{
    // console.log(rows)
    if(rows.length>0 && rows[0]["status"]==1){
      answered=1
      response.status(400).json({})
    }
    else{
          db.run('UPDATE answers SET correct = ? WHERE aid=?',[1,aid],function(err1){
            if(err1)
              console.log(err1)
            else{
                db.run('UPDATE questions SET status = ? WHERE qid=?',[1,qid],function(err2){
                if(err2)
                  console.log(err2)
                else
                  response.status(201).json({})
              })
            }
          })
        console.log("VALIDATE AN ANSWER") 
    }
  })
  db.close((err) => {
  if (err) {
    return console.log(err.message);
  }
  console.log('Close the database connection.');
});
});

//13.POST ANSWERS
app.post("/api/v1/answers", function(request, response){
  db = new sqlite3.Database('./database.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE , (err) => {
    if (err) {
     console.log(err.message);
    }
  });
  aid=request.body.aid;
  qid=request.body.qid;
  answer=request.body.answer;
  answerType = request.body.answerType;
  username = request.body.username;
  var dt = dateTime.create();
  var formatted = dt.format('Y-m-d H:M:S');
  console.log(formatted);
  let sql = 'SELECT * FROM answers';
  db.all(sql, [], (err, rows) => {
    var flag=0;
    for(let i=0;i<rows.length;i++){
      if(rows[i]['aid'] == aid){
        flag=1;
        response.status(400).json({})
      }
    }
    if(flag==0){
      db.run('INSERT INTO answers(aid,qid,answer,upvotes,created,username,type,correct) VALUES(?,?,?,?,?,?,?,?)',[aid,qid,answer,0,formatted,username,answerType,0],function(err1){
        if(err1)
          console.log(err1)
        else
          response.status(201).json({})
      })

    }
    console.log("ANSWER A QUESTION") 
  })
  db.close((err) => {
  if (err) {
    return console.log(err.message);
  }
  console.log('Close the database connection.');
});
});


//14. DELETE ANSWERS
app.delete("/api/v1/answers/:aid", function(request,response){
  db = new sqlite3.Database('database.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE , (err) => {
    if (err) {
     console.log(err.message);
    }
  });
  aid=request.params.aid
  sql = 'SELECT * FROM answers WHERE aid=?'
      db.all(sql,[aid],(err,rows)=>{
        if(rows.length==0){
          response.status(400).send({})
        }
        else{
          sql = 'DELETE FROM answers WHERE aid=?'
          db.run(sql,[aid],(err)=>{
            if(err)
              console.log(err)
            else{
              response.send({})
            }
          })
        }
      })
  console.log("DELETE ANSWERS")
  db.close((err) => {
    if (err) {
      return console.log(err.message);
    }
  console.log('Close the database connection.');
  });
});


//17. UPVOTE ANSWERS
app.post("/api/v1/answers/upvote", function(request, response){
  db = new sqlite3.Database('./database.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE , (err) => {
    if (err) {
     console.log(err.message);
    }
  });
  aid=request.body.aid;
  let sql = 'SELECT * FROM answers';
  db.all(sql, [], (err, rows) => {
    var temp=0;
    var flag=0
    for(let i=0;i<rows.length;i++){
      if(rows[i]['aid'] == aid){
        flag=1;
        temp=rows[i]['upvotes']+1;
      }
    }
    if(flag==1){
      db.run('UPDATE answers SET upvotes = ? WHERE aid=?',[temp,aid],function(err1){
        if(err1)
          console.log(err1)
        else
          response.status(201).json({"upvotes":temp})
      })
    }
    else{
      response.status(400).send({})
    }
    console.log("UPVOTE AN ANSWER") 
  })
  db.close((err) => {
  if (err) {
    return console.log(err.message);
  }
  console.log('Close the database connection.');
});
});

//18. GET COMMENTS
app.get("/api/v1/comments/:aid", function(request,response){
  db = new sqlite3.Database('./database.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE , (err) => {
    if (err) {
     console.log(err.message);
    }
    });
    aid=request.params.aid
    rows={}
    temp=0
    let sql = 'SELECT * FROM comments WHERE aid=? ORDER BY created DESC';
    db.all(sql, [aid], (err, rows) => {
      if(rows.length==0){
          response.status(204).send({});
        }
        else{
          resp={}
          for(let i=0;i<rows.length;i++){
            res={}
            res['comment']=rows[i]['comment'];
            res['username']=rows[i]['username'];
            resp[i]=res
          }
        console.log("GET Comments")
        console.log(res)
        response.json(resp)   
        }
    });
  db.close((err) => {
      if (err) {
          return console.log(err.message);
      }
      console.log('Close the database connection.');
    });
});

// 19. Get one question (Might not need later)
app.get("/api/v1/question/:qid", function(request,response){
  db = new sqlite3.Database('./database.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE , (err) => {
    if (err) {
     console.log(err.message);
    }
    });
    qid=request.params.qid
    rows={}
    let sql = 'SELECT * FROM questions WHERE qid=?';
    db.all(sql, [qid], (err, rows) => {
      if(rows.length==0){
          response.status(204).send({});
        }
        else{
          res={}
          for(let i =0;i<rows.length;i++){
                res['question']=rows[i]['question'];
                res['username']=rows[i]['username'];
              }
              response.json(res)  
          }
        console.log("GET QUESTIONS")
        // console.log(res) 
    });
  db.close((err) => {
      if (err) {
          return console.log(err.message);
      }
      console.log('Close the database connection.');
    });
});

//20. Is question closed
app.get("/api/v1/questions/closed/:qid", function(request,response){
  db = new sqlite3.Database('./database.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE , (err) => {
    if (err) {
     console.log(err.message);
    }
  });
  qid = request.params.qid
  // console.log(qid,aid)
  answered = 0
  db.all("SELECT * FROM questions WHERE qid=?",[qid],(err, rows)=>{
    console.log(rows)
    if(rows.length>0 && rows[0]["status"]==1){
      answered=1
      response.status(400).json()
    }
    else{
      response.status(200).json({})
    }
  })
  db.close((err) => {
  if (err) {
    return console.log(err.message);
  }
  console.log('Close the database connection.');
});
});

// 21. total number of answers
app.get("/api/v1/answers", function(request, response){
  db = new sqlite3.Database('./database.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE , (err) => {
    if (err) {
     console.log(err.message);
    }
  });
  // console.log("total")
  let sql = 'SELECT aid FROM answers';
  db.all(sql, [], (err, rows) => {
    response.status(200).json({"total":rows.length})
  })
  db.close((err) => {
  if (err) {
    return console.log(err.message);
  }
  console.log('Close the database connection.');
});
});

// 22. total number of comments
app.get("/api/v1/comments", function(request, response){
  db = new sqlite3.Database('./database.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE , (err) => {
    if (err) {
     console.log(err.message);
    }
  });
  // console.log("total co")
  let sql = 'SELECT * FROM comments';
  db.all(sql, [], (err, rows) => {
    response.status(200).json({"total":rows.length})
  })
  db.close((err) => {
  if (err) {
    return console.log(err.message);
  }
  console.log('Close the database connection.');
});
});

// 23. post comments
app.post("/api/v1/comments", function(request, response){
  db = new sqlite3.Database('./database.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE , (err) => {
    if (err) {
     console.log(err.message);
    }
  });
  aid=request.body.aid;
  cid=request.body.cid;
  comment=request.body.comment;
  username = request.body.username;
  var dt = dateTime.create();
  var formatted = dt.format('Y-m-d H:M:S');
  // console.log(formatted);
  let sql = 'SELECT * FROM comments';
  db.all(sql, [], (err, rows) => {
    var flag=0;
    for(let i=0;i<rows.length;i++){
      if(rows[i]['cid'] == cid){
        flag=1;
        response.status(400).json({})
      }
    }
    if(flag==0){
      db.run('INSERT INTO comments(cid,aid,comment,created,username) VALUES(?,?,?,?,?)',[cid,aid,comment,formatted,username],function(err1){
        if(err1)
          console.log(err1)
        else
          response.status(201).json({})
      })

    }
    console.log("new comment") 
  })
  db.close((err) => {
  if (err) {
    return console.log(err.message);
  }
  console.log('Close the database connection.');
});
});

app.post("/api/v1/questions", function(request,response){
  db = new sqlite3.Database('./database.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE , (err) => {
    if (err) {
     console.log(err.message);
    }
  });
  qid=request.body.qid;
  domain=request.body.domain;
  question = request.body.question;
  username= request.body.username;
  console.log("HERE");
  //created=request.body.created;
  console.log("Posting a question ok thanks")
  var dtt = dateTime.create();
  var formattedd = dtt.format('Y-m-d H:M:S');
  console.log(formattedd)
  
  let sql = 'SELECT * FROM questions';
  db.all(sql, [], (err, rows) => {
    var flag=0;
    for(let i=0;i<rows.length;i++){
      if(rows[i]['qid'] == qid){
        flag=1;
        response.status(400).json({})
      }
    }
    if(flag==0){
      db.run('INSERT INTO questions(qid,domain,question,username,status,upvotes,created) VALUES(?,?,?,?,?,?,?)',[qid,domain,question,username,0,0,formattedd],function(err1){
        if(err1)
          console.log(err1)
        else
          response.status(201).json({})
      })
    }
    console.log("ASK A QUESTION") 
  })
  db.close((err) => {
  if (err) {
    return console.log(err.message);
  }
  console.log('Close the database connection.');
});
});

//intelligent component #2
app.post("/api/v1/intel_2", function(request,response){
  var sentence = request.body.sentence;
  sentence = sentence.toLowerCase();
  console.log(sentence)
  var domains_intel = [];
  domains_intel.push({key:"data science", value:"DataScience"});
   domains_intel.push({key:"hadoop", value:"BigData"});
    domains_intel.push({key:"spark", value:"BigData"});
     domains_intel.push({key:"regression", value:"DataScience"});
      domains_intel.push({key:"decision trees", value:"DataScience"});
  domains_intel.push({key:"machine learning", value:"MachineLearning"});
  domains_intel.push({key:"web technology", value:"WebTechnology"});
  domains_intel.push({key:"data analytics", value:"DataAnalytics"});  
  domains_intel.push({key:"big data", value:"BigData"});  
  var res={};
  res["data"]=[];
  for(let i=0;i<domains_intel.length;i++){
    if(sentence.includes(domains_intel[i].key)){
      res["data"].push(domains_intel[i].value);
    }
  }
  console.log(res["data"].length)
  if(res["data"].length==0){
    response.status(404).json({});
  }
  else{
  response.status(200).json(res);
}
});


app.all('*', function(request, response){
  response.status(405).send({});
})

app.listen(3000, () => console.log('Listening on 3000'));
