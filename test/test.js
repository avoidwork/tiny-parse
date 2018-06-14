const path = require("path"),
	parse = require(path.join(__dirname, "..", "index.js"));

exports.hostless = {
	setUp: function (done) {
		this.test = function () {
			return parse("/");
		};

		done();
	},
	test: function (test) {
		test.expect(1);
		test.throws(this.test, function (err) {
			return err instanceof TypeError;
		}, "Invalid URL throws");
		test.done();
	}
};

exports.schemeless = {
	setUp: function (done) {
		this.test = function () {
			return parse("//blah/blah");
		};

		done();
	},
	test: function (test) {
		test.expect(1);
		test.throws(this.test, function (err) {
			return err instanceof TypeError;
		}, "Invalid URL throws");
		test.done();
	}
};

exports.valid = {
	setUp: function (done) {
		done();
	},
	test: function (test) {
		test.expect(1);
		test.equal(JSON.stringify(parse("http://localhost:8000/x?abc=true&abc=false#something")), "{\"query\":{\"abc\":[true,false]},\"hash\":\"#something\",\"host\":\"localhost:8000\",\"hostname\":\"localhost\",\"href\":\"http://localhost:8000/x?abc=true&abc=false#something\",\"origin\":\"http://localhost:8000\",\"password\":\"\",\"pathname\":\"/x\",\"port\":\"8000\",\"protocol\":\"http:\",\"search\":\"?abc=true&abc=false\",\"username\":\"\",\"auth\":\"\",\"path\":\"/x?abc=true&abc=false#something\"}", "Output matches expectation");
		test.done();
	}
};
