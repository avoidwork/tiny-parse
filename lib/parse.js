"use strict";

const tcoerce = require("tiny-coerce"),
	each = require("retsu").each,
	url = require("url");

function trim (obj) {
	return obj.replace(/^(\s+|\t+|\n+)|(\s+|\t+|\n+)$/g, "");
}

function isEmpty (obj) {
	return trim(obj).length === 0;
}

function queryString (arg = "", coerce = true) {
	const result = {},
		items = arg.replace(/^\?/, "").split("&");

	each(items, prop => {
		const aitem = prop.split("="),
			item = aitem.length > 2 ? [aitem.shift(), aitem.join("=")] : aitem;

		if (!isEmpty(item[0])) {
			item[0] = decodeURIComponent(item[0]);

			if (item[1] === undefined) {
				item[1] = "";
			} else {
				item[1] = coerce ? tcoerce(decodeURIComponent(item[1])) : decodeURIComponent(item[1]);
			}

			if (result[item[0]] === undefined) {
				result[item[0]] = item[1];
			} else if (result[item[0]] instanceof Array === false) {
				result[item[0]] = [result[item[0]], item[1]];
			} else {
				result[item[0]].push(item[1]);
			}
		}
	});

	return result;
}


function parse (arg, coerce = true) {
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
	parsed.pathname = (parsed.pathname || "").replace(/(%20|\+)/g, " ");
	parsed.path = parsed.pathname + (parsed.search || "");
	parsed.query = typeof parsed.search === "string" ? queryString(parsed.search, coerce) : {};

	return parsed;
}

module.exports = parse;
