categorySchema = require("./categorySchema");

function addcategory(req, res) {
  var category = new categorySchema();
  console.log(req.body.name);
  category.category.name = req.body.name;
  category.category.subcategory = req.body.subcategory;
  console.log(req.body.name);

  categorySchema.findOne({ "category.name": req.body.name }, function(
    err,
    doc
  ) {
    if (err) console.log(err);
    if (doc == null) {
      category.save(function(err) {
        if (err) {
          console.log(doc);
          console.log("yaha hai error" + err);
        } else {
          console.log("successful");
        }
      });
    } else {
      categorySchema.findOne(
        {
          "category.name": req.body.name,
          "category.subcategory": req.body.subcategory
        },
        function(err, docs) {
          if (err) console.log(err);
          if (docs == null) {
            categorySchema.findOneAndUpdate(
              { "category.name": req.body.name },
              { $push: { "category.subcategory": req.body.subcategory } },
              { new: true },
              function(err, res) {
                if (err) console.log(err);
                else {
                  console.log("update successful");
                }
              }
            );
          } else {
            console.log("already exists");
          }
        }
      );
    }
  });
}

function getcategory(req, res) {
  var category = new categorySchema();
  categorySchema.find({}, function(err, doc) {
    if (err) throw err;
    if (doc) {
      console.log(doc);
      var categ = [];
      for (var i = 0; i < doc.length; i++) {
        console.log({ doc: doc[i].category.name });
        categ[i] = { text: doc[i].category.name, value: doc[i].category.name };
      }
      res.send({ categ });
    }
  });
}

function getSubCategory(req, res) {
  var category = new categorySchema();
  categorySchema.find({}, function(err, doc) {
    if (err) throw err;
    if (doc) {
      console.log(doc);
      var subcateg = [];
      for (var i = 0; i < doc.length; i++) {
        console.log({
          exp: doc[i].category.subcategory,
          doc: doc[i].category.name
        });
        subcateg[i] = {
          text: doc[i].category.subcategory,
          value: doc[i].category.subcategory,
          category: doc[i].category.name
        };
      }
      res.send({ subcateg });
    }
  });
}

module.exports = {
  addcategory: addcategory,
  getcategory: getcategory,
  getSubCategory: getSubCategory
};
