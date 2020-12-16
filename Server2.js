const express = require('express');
const colors = require('colors');
const path = require('path');

const app = express();

const base = '/publicHTML';
const PORT = 3000;

app.use(function (req, res) {
	 if(req.url === '/'){
        req.url = '/index.html'
    }
	let pathname = path.join(__dirname + base + req.url);
	let fileExt = path.extname(req.url);
	
	res.sendfile(__dirname + base + req.url);
	console.log(req.url.yellow);
	console.log(fileExt.blue);
	// body...
})
app.listen(PORT)

console.log(`Server run on port ${PORT}`.green);