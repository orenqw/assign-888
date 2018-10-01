var http = require('http');
var fs = require('fs');
var formidable = require('formidable');



var express = require('express');
var app = express();


// Include my public function
var module_fileop = require('./fileop.js');



/* root */
app.get('/', function(req, res) {
    res.redirect('/homepage');
})


/* logout screen */

app.get('/logout', function(req, res) {
    res.sendFile('./logout.html', {
        "root": __dirname
    });

});

/* login screen */

app.get('/homepage', function(req, res) {
    res.sendFile('./login.html', {
        "root": __dirname
    });

});



/* online screen */

app.get('/online', function(req, res) {
    var online_data = module_fileop.do_online(fs);

    var html = fs.readFileSync('online.html', 'utf8');
    html = html.replace("<!--[WHOISCONNECTED]-->", online_data);
    res.write(html);
    res.end();

});



/* logout method */

app.post('/logout', function(req, res) {



    var form = new formidable.IncomingForm();
    var fields = false;
    form.parse(req, function(err, fields, files) {
        if (err) {
            console.log(err);
        }


        var login_status = module_fileop.do_logout(fs, fields.username);

        res.setHeader('Content-Type', 'application/json');
        res.statusCode = login_status.status;
        res.send(JSON.stringify({
            msg: login_status.msg
        }));




    });




});


/* login method */



app.post('/login', function(req, res) {


    var form = new formidable.IncomingForm();
    var fields = false;
    form.parse(req, function(err, fields, files) {
        if (err) {
            console.log(err);
        }


        var login_status = module_fileop.do_login(fs, fields.username, fields.password);

        res.setHeader('Content-Type', 'application/json');
        res.statusCode = login_status.status;
        res.send(JSON.stringify({
            msg: login_status.msg
        }));




    });

});



/* logout*/

app.get('/homepage', function(req, res) {
    res.sendFile('./logout.html', {
        "root": __dirname
    });

});




/* server running func */
var server = app.listen(1337, function() {
    var host = server.address().address
    var port = server.address().port

    console.log("This app is listening at http://%s:%s", host, port)
})