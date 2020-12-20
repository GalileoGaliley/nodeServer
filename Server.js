const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');

const fs = require('fs');
const colors = require('colors');

const PORT = 3756;
var base = '/build';

http.createServer(function (req, res) {
    var urlencodedParser = bodyParser.urlencoded({extended: false});

    if(req.url === '/'){
        req.url = '/index.html'
    }
    let pathname = path.join(__dirname + base + req.url);

    console.log(pathname.blue);


    var fileExt = path.extname(pathname);
   

        if (path.basename(pathname) == null) {
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
            };
            
            res.statusCode = 200;

            file.on('open',function () {
                file.pipe(res);
            });

            file.on('error', function (err) {
                console.log(err.red);
            });
            

        }
        if (req.method === 'POST') {
            console.log('method POST')
            let body = '';
            req.on('data', function(chunk){
            let form = decodeURI(chunk);
            console.log(form);
        });
        }else{
            console.log('method GET')
        }
        console.log(req.method + " Method".yellow)
}).listen(PORT); 

console.log(`Server run on port ${PORT}`.green);


   // if (!fileExt){
   //          pathname += '.html'; 
   //      }