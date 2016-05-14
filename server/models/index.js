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
    post: function () {} // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function () {}
  }
};

