// db.js
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://khushbu30:Mine143@cluster1.v7d7975.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
module.exports = mongoose;