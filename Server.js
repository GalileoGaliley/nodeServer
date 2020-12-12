const http = require('http');
const path = require('path');

const PORT = 3756;
const fs = require('fs');
const colors = require('colors');

var base = '/build';

http.createServer(function (req, res) {
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
        // body...
}).listen(PORT);
console.log(`Server run on port ${PORT}`.green);

   // if (!fileExt){
   //          pathname += '.html'; 
   //      }