var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
      //access the database
      //parse the data
      //respond with data 202
      console.log('$somehting');
      models.messages.get(req, res);
    }, // a function which handles a get request for all messages
    post: function (req, res) {} // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {},
    post: function (req, res) {}
  }
};

