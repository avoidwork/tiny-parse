const tcoerce = require("tiny-coerce"),
	{each} = require("retsu"),
	keys = [
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

module.exports = {
	each,
	isEmpty,
	queryString,
	keys
};
