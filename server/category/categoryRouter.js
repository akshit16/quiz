let express = require('express');
let router = express.Router()
categorySchema = require('./categorySchema')
var categoryController = require('./categoryController');
const bodyParser = require('body-parser');



router.post('/addcategory', function (req, res) {
    categoryController.addcategory(req,res)
    {
    try{
        console.log(req.body)
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub crafted with love!',
    });}
catch(err){
    console.log("something"+err)
}}
});

router.get('/getcategory', function (req, res) {
    categoryController.getcategory(req,res)
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

router.get('/getSubCategory', function (req, res) {
    categoryController.getSubCategory(req,res)
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


module.exports=router;