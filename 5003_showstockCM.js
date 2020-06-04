
var path = require('path');
var express = require('express');
var request = require('request');
const bodyParser = require('body-parser');
var urlencode = require('urlencode');
const mysql = require('mysql');
var app = express();
var staticPath = path.join(__dirname, '/');
app.use(express.static(staticPath));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
});

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
});
app.get('/login', function (req, res) {
    res.sendfile(__dirname + '/index.html');
});
app.get('/stock1', function (req, res) {
    res.sendfile(__dirname + '/index.html');
});
app.get('/stock2', function (req, res) {
    res.sendfile(__dirname + '/index.html');
});
app.get('/order', function (req, res) {
    res.sendfile(__dirname + '/index.html');
});


app.route('/API/Stock/api_stock')
.get(verifyToken,function (req, res) {
    var headersOpt = {  
        "content-type": "application/json",
        'mis-access-token': req.headers['mis-access-token'],
    };
    console.log('/API/Stock/api_stock/ '+new Date());
    request(
            {
            method:'get',
            url:'http://172.18.0.135:8510/api_stock', 
            headers: headersOpt,
            json: true,
        }, function (error, response, body) {  
            if(!error){
                res.json({ status: true, data: response.body }); 
            }else{
                res.json({ status: false, message: 'No token provided.' }); 
            }
            
    }); 
});

app.route('/API/Stock/api_stocksearch/:id')
.get(verifyToken,function (req, res) {
    var headersOpt = {  
        "content-type": "application/json",
        'mis-access-token': req.headers['mis-access-token'],
    };
    console.log('/API/Stock/api_stocksearch/ '+req.params.id);
    request(
            {
            method:'get',
            url:'http://172.18.0.135:8510/api_stock/'+req.params.id, 
            headers: headersOpt,
            json: true,
        }, function (error, response, body) {  
            if(!error){
                res.json({ status: true, data: response.body }); 
            }else{
                res.json({ status: false, message: 'No token provided.' }); 
            }
            
    }); 
});

app.route('/API/Stock/updateprint/:id')
.get(verifyToken,function (req, res) {
    var headersOpt = {  
        "content-type": "application/json",
        'mis-access-token': req.headers['mis-access-token'],
    };
    console.log('/API/Stock/updateprint/'+req.params.id);
    request(
            {
            method:'get',
            url:'http://172.18.0.135:8510/get/updateprint/'+encodeURIComponent(req.params.id), 
            headers: headersOpt,
            json: true,
        }, function (error, response, body) {  
            if(!error){
                res.json({ status: true, data: response.body }); 
            }else{
                res.json({ status: false, message: 'No token provided.' }); 
            }
            
    }); 
});


app.post('/API/Stock/uporganize',verifyToken, (req, res) => {
    var headersOpt = {  
        "content-type": "application/json",
        'mis-access-token': req.headers['mis-access-token'],
    };
    // console.log('/CM/postodregispre '+new Date());
    //  console.log(req.body);
    request(
            {
            method:'POST',
            url:'http://172.18.0.135:8505/uporganize', 
            form: req.body, 
            headers: headersOpt,
            json: true,
        }, function (error, response, body) {  
            res.json(response.body); 
    }); 
});

// app.post('/CM/postodregispre',verifyToken, (req, res) => {
//     var headersOpt = {  
//         "content-type": "application/json",
//         'mis-access-token': req.headers['mis-access-token'],
//     };
//     // console.log('/CM/postodregispre '+new Date());
//     console.log(req.body);
//     request(
//             {
//             method:'post',
//              url:'http://172.18.0.135:8005/commart/postodregispre', 
//             form: req.body, 
//             headers: headersOpt,
//             json: true,
//         }, function (error, response, body) {  
//             res.json(response.body); 
//     }); 
// });

// app.post('/CM/postodregis',verifyToken, (req, res) => {
//     var headersOpt = {  
//         "content-type": "application/json",
//         'mis-access-token': req.headers['mis-access-token'],
//     };
//      console.log('/CM/postodregis '+new Date());
//     // console.log(req.body);
//     request(
//             {
//             method:'post',
//              url:'http://172.18.0.135:8005/commart/postodregis', 
//             form: req.body, 
//             headers: headersOpt,
//             json: true,
//         }, function (error, response, body) {  
//             res.json(response.body); 
//     }); 
// });


function verifyToken(req, res, next) {
    var token = req.headers['mis-access-token'];
    if (!token) return res.status(401).send({ status: false, message: 'No token provided.' });
    if (token === 'eyJhbGciOiJIUzI1-NiIsInR5cCI6IkpXVCguJfguYwiLCw5.JSBknSzo') {
        next();
    } else {
        return res.status(401).send({ status: false, message: 'No token provided.' });
    }
}
app.set('port', process.env.PORT || 5003);
var server = app.listen(app.get('port'), function () {
    console.log('Server Gateway port 5003 Running');
});

app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') { // Send the error rather than to show it on the console
        res.status(401).send(err);
    }
    else {
        next(err);
    }
});