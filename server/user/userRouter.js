let express = require('express');
let router = express.Router()
userSchema = require('./userSchema')
var passport = require('passport');
const bodyParser = require('body-parser');
var LocalStrategy = require('passport-local').Strategy;
router.use(passport.initialize())
router.use(passport.session())
var bcrypt = require('bcryptjs');

userController=require('./userController')
router.post('/addUser',function(req,res){
    userController.addUser(req,res)
    {
        try{
            console.log(req.body.name)
        }
    catch(err){
        console.log("something"+err)
    }}
})

passport.use(new LocalStrategy(
	function (username, password, done) {
		userController.getUserByUsername(username, function (err, user) {
			if (err) throw err;
			if (!user) {
				return done(null, false, { message: 'Unknown User' });
			}

			userController.comparePassword(password, user.password, function (err, isMatch) {
				if (err) throw err;
				if (isMatch) {
                    return done(null, user);
                   // res.redirect('http://localhost:3000/')
				} else {
					return done(null, false, { message: 'Invalid password' });
				}
			});
		});
	}));

passport.serializeUser(function (user,done) {
    console.log("done"+done)
    console.log("id"+user.id)
    done(null, user);
    console.log("++++++"+done)
    //console.log(err)
});

passport.deserializeUser(function (id, done) {
	// adminController.getUserById(id, function (err, user) {
    //     done(err, user);
    userSchema.findById(id, function (err, user) {
        done(err, user);
        
        console.log(err)
	});
});

router.get('/', function(req,res){
    res.redirect('http://localhost:3000/')
})


// 
router.post('/userLogin', 
     passport.authenticate('local')
     ,
    function (req, res) 
    {
        try{
            console.log(req.body)
         console.log("+++passport"+(req.session.passport.user))
           res.send({express:req.user})
        console.log("session set"+JSON.stringify(req.session.passport))   
     }
    
    catch(err){
        console.log("something"+err)
        res.json({
            status: 'API not Working',
            message: 'Welcome to RESTHub crafted with love!',
        });
    }  
    });

    router.get('/data',function(req,res){
        res.send({express:req.user})
        console.log(req.user)
    })
    
    router.get('/session',(req,res)=>
    {   
        console.log("++++"+req.user)
        
    })


    router.post('/saveScore', function(req, res) {
        console.log(req.body)
    userController.saveScore(req,res)
    {
        try{
          //  console.log(req.body)
        }
    catch(err){
        console.log("something"+err)
    }}
    });

module.exports=router;