const express = require('express');
const { urlencoded } = require('express');
const PORT_NUMBER = 3000;
const app = express();

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

// todo: create dummy data for now
//       later change it into database mongodb
let dummyDataSoccer = [
    {
        teamname: "Kid Team"
    ,   image: "https://images.unsplash.com/photo-1572281004596-898318f2b1b8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
    ,   description: "Dummy description for Kid Team"
    },
    {
        teamname: "Red Team"
    ,   image: "https://images.unsplash.com/photo-1582586302869-715be816f60b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
    ,   description: "Dummy description for Read Team"
    }
];
// display all soccer data
app.get('/blog/soccer', function(req, res) {
    res.render('soccer/soccer', {dummySoccerTeams: dummyDataSoccer});
});

// display create soccer blog form
app.get('/blog/soccer/new', function(req, res) {
    res.render('soccer/new');
});

// todo: connect it to store in database 
//       for now it will just push it to the dummy data.
// post the data sended from the form create
// Cannot POST /blog/soccer
app.post('/blog/soccer', function(req, res) {
    let newPostData = req.body.soccer;
    dummyDataSoccer.push(newPostData);
    res.redirect('/blog/soccer');
});

// todo: connect it to database to display detail information
//       for now it will just display dummy data detail.

app.listen(PORT_NUMBER, function(req, res) {
    console.log(`BLOG BOARD APP RUNNING: ${PORT_NUMBER}`);
});