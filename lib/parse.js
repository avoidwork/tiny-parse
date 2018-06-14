"use strict";

const keys = [
	"hash",
	"host",
	"hostname",
	"href",
	"origin",
	"password",
	"pathname",
	"port",
	"protocol",
	"search",
	"username"
];

const tcoerce = require("tiny-coerce"),
	{each} = require("retsu");

function isEmpty (obj = "") {
	return obj.trim().length === 0;
}

function queryString (arg, coerce = true) {
	const result = {};

	for (const item of arg.searchParams.entries()) {
		let [key, value] = item;

		if (isEmpty(key) === false) {
			key = decodeURIComponent(key).trim();

			if (value === undefined) {
				item[1] = "";
			} else {
				value = coerce ? tcoerce(decodeURIComponent(value).trim()) : decodeURIComponent(value).trim();
			}

			if (result[key] === undefined) {
				result[key] = value;
			} else if (result[key] instanceof Array === false) {
				result[key] = [result[key], value];
			} else {
				result[key].push(value);
			}
		}
	}

	return result;
}

function parse (arg = "", coerce = true) {
	const uri = typeof arg === "string" ? arg : `http://${arg.headers.host || `localhost:${arg.socket.server._connectionKey.replace(/.*::/, "")}`}${arg.url}`,
		parsed = new URL(uri),
		result = {query: queryString(parsed, coerce)};

	each(keys, i => {
		result[i] = parsed[i];
	});

	result.auth = isEmpty(result.username) === false ? `${result.username}:${result.password}` : "";
	result.path = `${result.pathname}${result.search}${result.hash}`;

	return result;
}

module.exports = parse;
