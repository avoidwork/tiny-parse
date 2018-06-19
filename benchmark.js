"use strict";

const path = require("path"),
	parse = require(path.join(__dirname, "index.js")),
	nth = 1e6;

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

let x = -1;

while (++x < 3) {
	let i = -1;

	while (++i < nth) {
		parse(`http://localhost:${port()}/abcdef`);
	}
}
