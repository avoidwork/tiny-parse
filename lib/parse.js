"use strict";

const coerce = require("tiny-coerce"),
	each = require("retsu").each,
	url = require("url"),
	space = /\s+/,
	basic = /^Basic\s/;

function trim (obj) {
	return obj.replace(/^(\s+|\t+|\n+)|(\s+|\t+|\n+)$/g, "");
}

function isEmpty (obj) {
	return trim(obj).length === 0;
}

function queryString (arg = "") {
	const obj = {},
		result = (arg.split("?")[1] || "").split("&");

	each(result, prop => {
		const aitem = prop.replace(/\+/g, " ").split("="),
			item = aitem.length > 2 ? [aitem.shift(), aitem.join("=")] : aitem;

		if (!isEmpty(item[0])) {
			if (item[1] === undefined) {
				item[1] = "";
			} else {
				item[1] = coerce(decodeURIComponent(item[1]));
			}

			if (obj[item[0]] === undefined) {
				obj[item[0]] = item[1];
			} else if (obj[item[0]] instanceof Array === false) {
				obj[item[0]] = [obj[item[0]]];
				obj[item[0]].push(item[1]);
			} else {
				obj[item[0]].push(item[1]);
			}
		}
	});

	return obj;
}

function uri (req) {
	let header = req.headers.authorization || "",
		auth = "",
		token;

	if (!isEmpty(header) && basic.test(header)) {
		token = header.split(space).pop() || "";
		auth = new Buffer(token, "base64").toString();

		if (!isEmpty(auth)) {
			auth += "@";
		}
	}

	return "http://" + auth + req.headers.host + req.url;
}

function parse (arg) {
	let luri = arg.url ? uri(arg) : arg,
		idxAscii, idxQ, parsed;

	if (luri === undefined || luri === null) {
		luri = "";
	} else {
		idxAscii = luri.indexOf("%3F");
		idxQ = luri.indexOf("?");

		if (idxAscii < idxQ || idxQ === -1 && idxAscii > -1) {
			luri = luri.replace("%3F", "?");
		}
	}

	parsed = url.parse(luri);
	parsed.pathname = (parsed.pathname || "").replace(/%20/g, " ");
	parsed.path = parsed.pathname + (parsed.search || "");
	parsed.query = parsed.search ? queryString(parsed.search) : {};

	return parsed;
}

module.exports = parse;
