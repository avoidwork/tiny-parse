"use strict";

const {URL} = require("url"),
	path = require("path"),
	{isEmpty, queryString} = require(path.join(__dirname, "lib", "utility.js"));

class TinyParse {
	constructor (hash, host, hostname, href, origin, password, pathname, port, protocol, query, search, username) {
		this.query = query;
		this.hash = hash;
		this.host = host;
		this.hostname = hostname;
		this.href = href;
		this.origin = origin;
		this.password = password;
		this.pathname = pathname;
		this.port = port;
		this.protocol = protocol;
		this.search = search;
		this.username = username;
		this.auth = isEmpty(this.username) === false ? `${this.username}:${this.password}` : "";
		this.path = `${this.pathname}${this.search}${this.hash}`;
	}
}

function factory (arg = "", coerce = true) {
	const uri = typeof arg === "string" ? arg : `http://${arg.headers.host || `localhost:${arg.socket.server._connectionKey.replace(/.*::/, "")}`}${arg.url}`,
		parsed = new URL(uri);

	return new TinyParse(parsed.hash, parsed.host, parsed.hostname, parsed.href, parsed.origin, parsed.password, parsed.pathname, parsed.port, parsed.protocol, queryString(parsed, coerce), parsed.search, parsed.username);
}

module.exports = factory;

