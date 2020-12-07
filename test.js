const http = require('http');
const path = require('path');

const fs = require('fs');
const colors = require('colors');

var base = '/publicHtml';

http.createServer(function (req, res) {
    let pathname = base + req.url + '.html';
    console.log(pathname.green);

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
}).listen(3000);
console.log('Server run on port 3000'.green);