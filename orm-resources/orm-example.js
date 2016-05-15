/* You'll need to
 *   npm install sequelize
 * before running this example. Documentation is at http://sequelizejs.com/
 */

var Sequelize = require('sequelize');
var db = new Sequelize('chatter', 'root', '1234');
/* TODO this constructor takes the database name, username, then password.
 * Modify the arguments if you need to */

/* first define the data structure by giving property names and datatypes
 * See http://sequelizejs.com for other datatypes you can use besides STRING. */

var User = db.define('users', {
  username: Sequelize.STRING
});

var Room = db.define('rooms', {
  roomname: Sequelize.STRING
});

var Message = db.define('messages', {
  // userid: Sequelize.INTEGER,
  text: Sequelize.STRING
  // roomid: Sequelize.INTEGER
});

User.hasMany(Message);
// Room.hasMany(Message);
Message.belongsTo(User, {
  foreignKey: 'userId'
});
// Message.belongsTo(Room);

/* Sequelize comes with built in support for promises
 * making it easy to chain asynchronous operations together */
// User.sync()
  // .then(function() {
  //   // Now instantiate an object and save it:
  //   return User.create({username: 'Jean Valjean'});
  // })
  // .then(function() {
  //   // Retrieve objects from the database:
  //   return User.findAll({ where: {username: 'Jean Valjean'} });
  // })
  // .then(function(users) {
  //   users.forEach(function(user) {
  //     console.log(user.username + ' exists');
  //   });
  //   db.close();
  // })
  // .catch(function(err) {
  //   // Handle any error in the chain
  //   console.error(err);
  //   db.close();
  // });
// User.sync();
// Room.sync();
var obj = {
  username: 'George',
  text: 'Yo dawg',
  roomname: 'HR'
};

var addmsg = (msg) => {
  User.sync()
    .then( () => {
      return User.findCreateFind({
        where: {
          username: msg.username
        }
      });
    })
    .then( (usrPrm) => {
      Message.sync();
      return usrPrm;
    }) 
    .then( (usrPrm) => {
      console.log(usrPrm[0].dataValues.id, '<----- userId');
      return Message.create({
        text: msg.text,
        userId: usrPrm[0].dataValues.id
      });
    });
};

addmsg(obj);