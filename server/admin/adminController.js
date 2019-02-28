adminSchema = require("./adminSchema");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var bcrypt = require("bcryptjs");
var LocalStrategy = require("passport-local").Strategy;
var admin = new adminSchema();

function addAdmin(req, res) {
  var admin = new adminSchema();
  console.log(req.body.name);
  admin.name = req.body.name;
  admin.password = req.body.password;
  admin.fullname = req.body.fullname;
  console.log(admin.name);
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(admin.password, salt, function(err, hash) {
      admin.password = hash;
      admin.save(function(err) {
        if (err) console.log(err);
        else {
          console.log("successful");
        }
      });
    });
  });
}

function getUserByUser(name, callback) {
  var query = { name: name };
  console.log("radadad" + name);
  adminSchema.findOne(query, callback);
}

function getUserById(id, callback) {
  console.log("id se lenge" + id);
  adminSchema.findById(id, callback);
}

function comparePwd(candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    if (err) throw err;
    callback(null, isMatch);
  });
}
module.exports = {
  addAdmin: addAdmin,
  getUserByUser: getUserByUser,
  comparePwd: comparePwd,
  getUserById: getUserById
};
