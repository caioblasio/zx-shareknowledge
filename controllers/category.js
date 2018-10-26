const mongoose = require('mongoose');
const Category = mongoose.model('Category');

exports.create = (req, res, next) => {

  let category = new Category();
  category.name = req.body.category.name;

  category.save().then(() => {
      return res.json(category.toJSON());
  }).catch(function(err) {

      let errors = {};

      for(let errorName in err.errors) {
          errors[errorName] = err.errors[errorName].message;
      }

      next({
          status: 409,
          code: 1002,
          message: errors
      });
  });
}

exports.getAll = (req, res, next) => {
  Category.find().then((categories) => {
    
    return res.json(categories.map(category => category.toJSON()));

  }).catch(next);
}