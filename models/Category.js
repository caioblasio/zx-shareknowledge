const mongoose = require('mongoose');

let CategorySchema = new mongoose.Schema({
  name: {type: String, unique: true, required: true}
});

CategorySchema.methods.toJSON = function(){
  return {
    id: this._id,
    name: this.name
  };
};

mongoose.model('Category', CategorySchema);