const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
  name: String,
  age: Number,
  category: { type: String, enum: ['Dog', 'Cat','Cow','Monkey','Bird'] },
  description: String,
  ImageUrl:String,
  adoptedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  addedBy:{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Animal = mongoose.model('Animal', animalSchema);

module.exports = Animal;