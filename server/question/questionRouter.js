var multer = require('multer');
var bodyParser = require('body-parser');
let express = require('express');
let router = express.Router()
var xlstojson = require("xls-to-json-lc");
var xlsxtojson = require("xlsx-to-json-lc");
var quizController = require('./questionController')

router.post('/upload', function(req, res) {
        console.log(req.body)
    quizController.uploadFile(req,res)
    {
    try{
        console.log(req.body)
}
catch(err){
    console.log("something"+err)
}}
});

router.post('/createQuiz', function(req, res) {
    console.log(req.body)
quizController.createQuiz(req,res)
{
    try{
      //  console.log(req.body)
    }
catch(err){
    console.log("something"+err)
}}
});




router.get('/getQuizName', function (req, res) {
    quizController.getQuizName(req,res)
    {
    try{
      //  console.log(req)
    // res.send({
    //    express:req.doc
    // });
}
catch(err){
    console.log("something"+err)
}}
});

router.post('/getQuiz', function(req, res) {
    console.log(req.body)
quizController.getQuiz(req,res)
{
    try{
      //  console.log(req.body)
    }
catch(err){
    console.log("something"+err)
}}
});

router.get('/download', function (req, res, next) {
    var filePath = "./server/download/test.xlsx"; // Or format the path using the `id` rest param
    var fileName = "test.xlsx"; // The default name the browser will use

    res.download(filePath, fileName);    
});

module.exports=router;