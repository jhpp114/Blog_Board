// requires from npm
const express = require('express');
const { urlencoded } = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const PORT_NUMBER = 3000;
const app = express();
// =================================
// ========Routes Setup=============
// =================================
const soccerRoute = require('./routes/soccer');
const commentRoute = require('./routes/comment');
const globalRoute = require('./routes/global');
// =================================
// =======connect-flash=============
// =================================
const flash = require('connect-flash');


// ==========DataSeed===============
// clean up before test
// const seedDb = require('./seed');
// // const seed = require('seed')
// seedDb();
// =================================
// =========Require Models==========
// =================================
const Soccer = require('./models/soccer');
const Comment = require('./models/comment');
const User = require('./models/user');
// ==================
// =Database Connect=
// ==================
mongoose.connect('mongodb://localhost/my_blog_board', {
    useNewUrlParser: true
,   useUnifiedTopology: true
})
.then(() => console.log("DB Connected"))
.catch( (error) => console.log(`Error on connecting database ${error}`));
mongoose.set('useFindAndModify', false);

// app configure
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(flash());

app.use(require('express-session') ({
    secret: "secret"
,   resave: false
,   saveUninitialized: false
}));
// passport configure
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ========== Global Middleware ===========
app.use( (req, res, next) => {
    res.locals.user = req.user;
    res.locals.error_message = req.flash("error");
    res.locals.success_message = req.flash("success");
    next();
});

// ==================================
// Retrieve Routers from Router files
// ==================================
app.use(soccerRoute);
app.use(commentRoute);
app.use(globalRoute);

// Listen to the port
app.listen(PORT_NUMBER, function(req, res) {
    console.log(`BLOG BOARD APP RUNNING: ${PORT_NUMBER}`);
});
