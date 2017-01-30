"use strict";

const coerce = require("tiny-coerce"),
	each = require("retsu").each,
	url = require("url");

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


function parse (arg) {
	let uri = arg.url || arg,
		idxAscii, idxQ, parsed;

	if (uri === undefined || uri === null) {
		uri = "";
	} else {
		idxAscii = uri.indexOf("%3F");
		idxQ = uri.indexOf("?");

		if (idxAscii < idxQ || idxQ === -1 && idxAscii > -1) {
			uri = uri.replace("%3F", "?");
		}
	}

	parsed = url.parse(uri);
	parsed.pathname = (parsed.pathname || "").replace(/%20/g, " ");
	parsed.path = parsed.pathname + (parsed.search || "");
	parsed.query = parsed.search ? queryString(parsed.search) : {};

	return parsed;
}

module.exports = parse;
