//const { createServer } = require("http");
const express = require('express');
const next = require("next");

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    const server = express();
    
    server.get('*', (req, res) => {
			return handle(req, res);
		});

		server.listen(port, err => {
			if (err) throw err;
			console.log('> Ready on http://localhost:' + port);
		});
  })
  .catch(err => {
    console.log(JSON.stringify(err))
    process.exit(1)
  })

/*
app.prepare().then(() => {
  createServer((req, res) => {
    handle(req, res);
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
*/