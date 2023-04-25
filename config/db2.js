require('dotenv').config();
const mongoose = require('mongoose');

let conn = mongoose.createConnection(process.env.MONGO_URI2, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = conn;
