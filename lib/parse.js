"use strict";

const {URL} = require("url"),
	path = require("path"),
	{each, isEmpty, queryString, keys} = require(path.join(__dirname, "utility.js"));

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
