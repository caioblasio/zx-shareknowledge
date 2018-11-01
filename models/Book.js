const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let BookSchema = new mongoose.Schema({
  title: {type: String, required: true, index: true},
  subtitle: String,
  authors: {type: [String], required: true},
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  description: String,
  pageCount: String,
  imageLink: String,
  averageRating: String,
  updated: { type: Date, default: Date.now },
});

BookSchema.methods.toJSON = function(){
  return {
    id: this._id,
    title: this.name,
    subtitle: this.subtitle,
    authors: this.authors,
    category: this.category.name,
    description: this.description,
    pageCount: this.pageCount,
    imageLink: this.imageLink,
    averageRating: this.averageRating,
    updated: this.updated
  };
};

mongoose.model('Book', BookSchema);