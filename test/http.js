const path = require("path"),
	http = require("http"),
	tinyhttptest = require("tiny-httptest"),
	parse = require(path.join(__dirname, "..", "index.js"));

function random () {
	return Math.floor(Math.random() * 100);
}

function port () {
	let n = Number(`80${random()}`);

	if (n < 1000) {
		n = Number(`${n}0`);
	}

	return n;
}

exports.relative = {
	setUp: function (done) {
		this.port = port();
		this.expectation = JSON.stringify({
			"query": {},
			"hash": "",
			"host": `localhost:${this.port}`,
			"hostname": "localhost",
			"href": `http://localhost:${this.port}/`,
			"origin": `http://localhost:${this.port}`,
			"password": "",
			"pathname": "/",
			"port": this.port.toString(),
			"protocol": "http:",
			"search": "",
			"username": "",
			"auth": "",
			"path": "/"
		});
		this.parsed = {};
		this.server = http.createServer((req, res) => {
			this.parsed = JSON.stringify(parse(req));
			res.writeHead(200, {"content-type": "text/plain"});
			res.end("OK");
		}).listen(this.port, () => done());
	},
	test: function (test) {
		test.expect(1);
		tinyhttptest({url: `http://localhost:${this.port}/`})
			.end()
			.then(() => {
				test.equal(this.parsed, this.expectation, "Output matches expectation");
				test.done();
			})
			.catch(err => test.done(err));
	}
};
