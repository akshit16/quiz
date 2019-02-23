const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const errorHandler = require('errorhandler');
const mongoose = require('mongoose');
var passport = require('passport');
var multer = require('multer');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcryptjs');
var cors = require('cors')

mongoose.promise = global.Promise;

const isProduction = process.env.NODE_ENV === 'production';

const app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

/** API path that will upload the files */

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({ secret: 'quizapp', resave: false, saveUninitialized: false }));
app.use(passport.initialize())
app.use(passport.session())

//routes
app.use("/api/admin",require('./server/admin/adminRouter'))
app.use("/api/category",require('./server/category/categoryRouter'))
app.use("/api/quiz",require('./server/question/questionRouter'))
app.use("/api/user",require('./server/user/userRouter'))

if(!isProduction) {
  app.use(errorHandler());
}
app.get('/logout', function (req, res){
    req.session.destroy(function (err) {
      res.redirect('/'); //Inside a callback… bulletproof!
    });
  });
  io.on('connection', socket =>{
    console.log('a user is connected')
    
    socket.on('SEND_MESSAGE', (data) => {
      console.log(data)
      io.emit('RECEIVE_MESSAGE', data);
   })
   socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})
mongoose.connect('mongodb://localhost/quizapp',()=>{
    console.log("connected")
});
mongoose.set('debug', true);

if (!isProduction) {
  app.use((req, res,err)=> {
    res.status(err.status || 500);

    res.json({
      errors: {
        message: err.message,
        error: err,
      },
    });
  });
}


http.listen(5000, () => console.log('Server started on http://localhost:5000'));
