const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: String,
  adoptedAnimals: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Animal' }],
  addedAnimals: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Animal' }]
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema);

module.exports = User;