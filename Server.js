const http = require('http');
const path = require('path');

const fs = require('fs');
const colors = require('colors');
const PORT = 3000;
var base = '/build';

http.createServer(function (req, res) {
    if(req.url === '/'){
        req.url = '/index'
    }
    let pathname = path.join(__dirname + base + req.url);

    console.log(pathname.blue);

    let fileExt = path.extname(pathname);

    if (!fileExt){
            pathname += '.html'; 
        }
        if (path.basename(pathname) == null) {
            res.writeHead(404);
            res.write('Страница не найдена 404\n');
            res.end();
        }else{
            let file = fs.createReadStream(pathname);
            res.setHeader('Content-type', 'text/html');
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