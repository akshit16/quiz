userSchema = require('./userSchema')
var bcrypt = require('bcryptjs');


function addUser(req,res){
    var user= new userSchema()
 console.log(req.body.name)
 user.userName = req.body.userName
 user.password = req.body.password
 user.fullname = req.body.fullname
 user.email=req.body.email
 if(req.body.type){
 user.type=req.body.type}
 bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(user.password, salt, function(err, hash) {
        user.password = hash;
        user.save(function (err) {
    if (err)
         console.log(err)
else {
    console.log("successful")
    res.send({exp:'success'})
}
});
})
})}

function getUserByUsername(username, callback){
    var query = {userName: username};
    console.log("radadad"+username)
    userSchema.findOne(query, callback);
}

function getUserById(id, callback){
    console.log("id se lenge"+id)
    userSchema.findById(id, callback);
}

function comparePassword(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
        if(err) throw err;
        callback(null, isMatch);
    });
}

saveScore=(req,res)=>{
 let user = new userSchema()
console.log(req.body)
user.score = req.body
const data = {
    quizName:req.body.quizName
}
// userSchema.score.subcategory = req.body.subcategory
// userSchema.score.value = req.body.score
// userSchema.score.quizName = req.body.quizName
console.log(user.score[0].value)
userSchema.find({'userName':req.body.userName,'score.quizName':req.body.quizName},function(err,doc){
if(err) console.log("dp"+err)
if(doc==""){
   console.log("null me agaya")
    userSchema.findOneAndUpdate({'userName':req.body.userName},{$push:{'score':req.body}},function(err,doc){
        if(err) console.log(err)
        else{
            console.log(doc)
            console.log("update successful")
        }
    })
}
else{
    console.log(doc.length)
console.log("non null me agaya")
    userSchema.findOneAndUpdate({'userName':req.body.userName,"score.quizName":req.body.quizName},{$set:{"score.$.value":req.body.value}},function(err,doc)
     {   if (err)
             console.log("idhar bhi"+err)
    else {
        console.log(doc)
        console.log("successful")
        res.send({exp:'success'})
    }
})
     }
    })

}
module.exports={
    addUser:addUser,
    comparePassword:comparePassword,
    getUserById:getUserById,
    getUserByUsername:getUserByUsername,
    saveScore:saveScore
}