const express = require('express');
const PORT_NUMBER = 3000;
const app = express();

// app configure
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));


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
app.get('/blog/soccer', function(req, res) {
    res.render('soccer/soccer');
});

app.listen(PORT_NUMBER, function(req, res) {
    console.log(`BLOG BOARD APP RUNNING: ${PORT_NUMBER}`);
});