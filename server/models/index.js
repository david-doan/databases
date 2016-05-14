var db = require('../db');

module.exports = {
  messages: {
    get: function (req, res) {
      //connect to db
      db.DB.query('select * from messages', (err, row) => {
        if (err) {
          console.log('ERROR!!! Cannot query DB for messages');
        }
        console.log('Successful send from DB');
        res.status(200).send({results:row});
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
        if (err) {console.log(err);}
        //query to insert room
        db.DB.query(RmInsert(obj), (err) => {
          if (err) {console.log(err);}
          //query to get userID
          db.DB.query(usrQuery(obj), (err, row) => {
            if (err) {
              console.log('cannot find user');
            }
            var usrID = row[0].id;
            //query to get rmID
            db.DB.query(rmQuery(obj), (err, row) =>{
              if (err) {
                console.log('cannot find room');
              }
              var rmID = row[0].id;
              //query to insert msg    
              db.DB.query(MsgInsert(obj, rmID, usrID), (err) => {
                //if fail
                if (err) {
                  console.log('usrID = ', usrID);
                  console.log('rmID = ', rmID);
                  console.log('cannot inser message');
                  //respond with 404 erorr
                  res.status(400).send('poop');
                }
                //respond with 200
                res.status(200).send('Successful POST');
              });
            });
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
  return `insert users (name) values ('${user}')`;  
};

var RmInsert = (obj) => {
  var roomname = obj.roomname;
  console.log('this is obj --->',obj);
  return `insert room (name) values ('${roomname}')`;
};

var MsgInsert = (obj, roomId, userId) => {
  var message = obj.text;
  return `insert messages (msg, id_user, id_room) values ('${message}',${userId},${roomId})`;
};

var usrQuery = (obj) => {
  var user = obj.username;
  return `select id from users where name = '${user}'`;
};

var rmQuery = (obj) => {
  var room = obj.roomname;
  return `select id from room where name = '${room}'`;
};