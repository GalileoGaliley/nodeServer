const http = require('http');
const path = require('path');
const mailer = require('./nodemailer');;



const fs = require('fs');
const url = require('url');
const colors = require('colors');

const PORT = 3001;
var base = '/build';

http.createServer(function (req, res) {

    if(req.url == '/' || req.url == '/index' || req.url == '/main' || req.url == '/aboutUs' || req.url == '/productions' || req.url == '/youPidr' || req.url == '/forClient' || req.url == '/contacts'){
        req.url = '/index.html'
    };
    if (req.url == '/manager' || req.url == '/Manager') {
        req.url = '/Manager.html'
    }

    let pathname = path.join(__dirname + base + req.url);


    console.log(pathname.blue);


    var fileExt = path.extname(pathname);



        if (path.basename(pathname) === undefined) {
            res.writeHead(404);
            res.write('Страница не найдена 404\n');
            res.end();
        }else{
            let file = fs.createReadStream(pathname);
            console.log(fileExt.yellow);
            switch(fileExt){
                case '.html':
                    res.setHeader('Content-type', 'text/html');
                    break;
                case '.css':
                    res.setHeader('Content-type', 'text/css');
                    break;
                case '.js':
                    res.setHeader('Content-type', 'text/javascript');
                    break;
                case '.map':
                    res.setHeader('Content-type', 'text/map');
                    break;
                case '.json':
                    res.setHeader('Content-type', 'text/json');
                    break;
            };

            res.statusCode = 200;

            file.on('open',function () {
                file.pipe(res);
            });

            file.on('error', function (err) {
              res.writeHead(404);
              res.write('<h1 style = "text-align:center">Page not found: code 404\n</h1>');
              res.end();
            });



        }
        if (req.method == 'POST') {
          let urlParse = url.parse(req.url, true);

          console.log('method POST:');
          console.log(urlParse);
            let body = '';
            req.on('data', function(chunk){

            let form = decodeURI(chunk);
            const message = {
                from: '<neutrino.web.study@inbox.ru>',
                to: 'ThePursuer@mail.ru',
                subject:'Work',
                text:'Новый заказ: ' + form
            };
            mailer(message);
        });
        }else{
            console.log('method GET');
        }

}).listen(PORT);

console.log(`Server run on port ${PORT}`.green);


   // if (!fileExt){
   //          pathname += '.html';
   //      }
