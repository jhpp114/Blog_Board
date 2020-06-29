// requires from npm
const express = require('express');
const { urlencoded } = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
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
mongoose.set('useFindAndModify', false);

// app configure
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));

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
// get detail page and render it base on the pass id.
app.get('/blog/soccer/:id', async function(req, res) {
    let foundData = await Soccer.findById(req.params.id);
    res.render('soccer/detail', {foundData: foundData});
});
// render edit form to user base on the data found
app.get('/blog/soccer/:id/edit', async function(req, res) {
    let editData = await Soccer.findById(req.params.id);
    res.render('soccer/edit', {editData: editData});
});
// submit editted data and save it into database
app.put('/blog/soccer/:id', async function(req, res) {
    let editSubmittedData = req.body.soccer;
    await Soccer.findByIdAndUpdate(req.params.id, editSubmittedData);
    res.redirect('/blog/soccer/' + req.params.id);
});
// delete the data
app.delete('/blog/soccer/:id/', async function(req, res) {
    let deleteItemId = req.params.id;
    await Soccer.findByIdAndRemove(deleteItemId);
    res.redirect('/blog/soccer/');
    // so the data got deleted i guess
});

// Listen to the port
app.listen(PORT_NUMBER, function(req, res) {
    console.log(`BLOG BOARD APP RUNNING: ${PORT_NUMBER}`);
});