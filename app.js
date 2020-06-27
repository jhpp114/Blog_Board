// requires from npm
const express = require('express');
const { urlencoded } = require('express');
const mongoose = require('mongoose');
const PORT_NUMBER = 3000;
const app = express();
const Soccer = require('./models/soccer');
// ==================
// =Database Connect=
// ==================
mongoose.connect('mongodb://localhost/my_blog_board', {
    useNewUrlParser: true
,   useUnifiedTopology: true
})
.then(() => console.log("DB Connected"))
.catch( (error) => console.log(`Error on connecting database ${error}`));

// app configure
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended: true}));

// ================
// ===ROUTE========
// ================
// welcome page
app.get('/', function(req, res) {
    res.render('welcome');
});

app.get('/blogs', function(req, res) {
    res.render('blogs');
});

// ===============
// ===Soccer======
// ===============
// display all soccer data
app.get('/blog/soccer', async function(req, res) {
    let dummyDataSoccer = await Soccer.find({});
    res.render('soccer/soccer', {dummySoccerTeams: dummyDataSoccer});
});

// display create soccer blog form
app.get('/blog/soccer/new', function(req, res) {
    res.render('soccer/new');
});


// post the data sended from the form create
app.post('/blog/soccer', async function(req, res) {
    let newPostData = req.body.soccer;
    await Soccer.create(newPostData);
    // await Soccer.save();
    // dummyDataSoccer.push(newPostData);
    res.redirect('/blog/soccer');
});
// 오예~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

app.listen(PORT_NUMBER, function(req, res) {
    console.log(`BLOG BOARD APP RUNNING: ${PORT_NUMBER}`);
});