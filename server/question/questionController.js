var multer = require("multer");
var bodyParser = require("body-parser");
let express = require("express");
var quizSchema = require("./questionSchema.js");
var xlstojson = require("xls-to-json-lc");
var xlsxtojson = require("xlsx-to-json-lc");
const fs = require("fs");
var jsonData = [];
var storage = multer.diskStorage({
  //multers disk storage settings
  destination: function(req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function(req, file, cb) {
    var datetimestamp = Date.now();
    cb(
      null,
      file.fieldname +
        "-" +
        datetimestamp +
        "." +
        file.originalname.split(".")[file.originalname.split(".").length - 1]
    );
  }
});
var upload = multer({
  //multer settings
  storage: storage,
  fileFilter: function(req, file, callback) {
    //file filter
    if (
      ["xls", "xlsx"].indexOf(
        file.originalname.split(".")[file.originalname.split(".").length - 1]
      ) === -1
    ) {
      return callback(new Error("Wrong extension type"));
      console.log(file.originalname);
    }
    callback(null, true);
  }
}).single("file");

function uploadFile(req, res) {
  var exceltojson; //Initialization
  upload(req, res, function(err) {
    if (err) {
      console.log(req.body);
      res.json({ error_code: 1, err_desc: err });
      console.log(err);
      return;
    }
    /** Multer gives us file info in req.file object */
    if (!req.file) {
      res.json({ error_code: 1, err_desc: "No file passed" });
      return;
    }
    //start convert process
    /** Check the extension of the incoming file and
     *  use the appropriate module
     */
    if (
      req.file.originalname.split(".")[
        req.file.originalname.split(".").length - 1
      ] === "xlsx"
    ) {
      exceltojson = xlsxtojson;
    } else {
      exceltojson = xlstojson;
    }
    try {
      exceltojson(
        {
          input: req.file.path, //the same path where we uploaded our file
          output: null, //since we don't need output.json
          lowerCaseHeaders: true
        },
        function(err, result) {
          if (err) {
            return res.json({ error_code: 1, err_desc: err, data: null });
            console.log("++++++" + err);
          }
          jsonData = result;
          res.json({ error_code: 0, err_desc: null, data: result });
          console.log("***" + JSON.stringify(result));
        }
      );
    } catch (e) {
      res.json({ error_code: 1, err_desc: "Corupted excel file" });
      console.log(e);
    }
  });
}

function createQuiz(req, res) {
  var quiz = new quizSchema();

  quiz.questions = jsonData;
  console.log(req.body.quizname);
  quiz.quizname = req.body.quizname;
  quiz.category = req.body.category;
  quiz.subcategory = req.body.subcategory;

  quiz.save(function(err) {
    if (err) {
      console.log(err);
      jsonData = [];
    } else {
      console.log("successful");
      jsonData = [];
    }
  });
}
function getQuiz(req, res) {
  var quiz = new quizSchema();

  var categ = req.body.category;
  var subcateg = req.body.subcategory;
  var name = req.body.quizName;
  console.log(req);
  // var categ = "TV Shows"
  console.log(categ);
  console.log(subcateg);
  //  var subcateg = "Friends"

  quizSchema.findOne(
    { category: categ, subcategory: subcateg, quizname: name },
    function(err, docs) {
      if (err) console.log(err);
      if (docs == null) {
        console.log("no quiz found");
      } else {
        console.log("found the quiz");
        res.send({ exp: docs.questions });
      }
    }
  );
}
getQuizName = (req, res) => {
  var quiz = new quizSchema();
  quizSchema.find({}, function(err, doc) {
    if (err) throw err;
    if (doc) {
      console.log(doc);
      var quizname = [];
      for (var i = 0; i < doc.length; i++) {
        console.log({
          exp: doc[i].quizname,
          doc: doc[i].category,
          doc: doc[i].subcategory
        });
        quizname[i] = {
          text: doc[i].quizname,
          value: doc[i].quizname,
          category: doc[i].category,
          subcategory: doc[i].subcategory
        };
      }
      res.send({ quizname });
    }
  });
};
module.exports = {
  uploadFile: uploadFile,
  createQuiz: createQuiz,
  getQuiz: getQuiz,
  getQuizName: getQuizName
};
