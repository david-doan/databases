var db = require('../db');

var getMsgs = 'select u.username, r.roomname, m.msg from messages m \
                inner join users u on u.id = m.userid \
                inner join rooms r on r.id = m.roomid';

module.exports = {
  messages: {
    get: function (req, res) {
      //connect to db
      db.DB.query( getMsgs, (err, row) => {
        if (err) {
          console.log('ERROR!!! Cannot query DB for messages');
          db.DBConnect();
          res.status(400).send('Database is down');
        } else {
          console.log('Successful send from DB');
          res.status(200).send({results: row });
        }
      });
      //get the stuff
      //respond
    }, // a function which produces all the messages
    post: function (req, res) {
      console.log('$$$$$$$$$$$$$$$$$$$$', req.body);
      var obj = req.body;
      // query to insert user
      db.DB.query(UsrInsert(obj), (err) => {
        // if fail
        if (err) { console.log(err); }
        //query to insert room
        db.DB.query(RmInsert(obj), (err) => {
          if (err) { console.log(err); }
          //insert message   
          db.DB.query( MsgInsert(obj), (err) => {
            //if fail
            if (err) {
              console.log('cannot insert message');
              //respond with 404 erorr
              res.status(400).send('poop');
            } else {
              //respond with 200
              res.status(200).send('Successful POST');
            }
          });
          
        });
      });
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function () {}
  }
};

var UsrInsert = (obj) => {
  var user = obj.username;
  return `insert users (username) values ('${user}')`;  
};

var RmInsert = (obj) => {
  var roomname = obj.roomname;
  console.log('this is obj --->',obj);
  return `insert rooms (roomname) values ('${roomname}')`;
};

var MsgInsert = (obj) => {
  var message = obj.text;
  return `insert messages (msg, userid, roomid) values ('${message}',(${usrQuery(obj)}),(${rmQuery(obj)}))`;
};

var usrQuery = (obj) => {
  var user = obj.username;
  return `select id from users where username = '${user}'`;
};

var rmQuery = (obj) => {
  var room = obj.roomname;
  return `select id from rooms where roomname = '${room}'`;
};