module.exports = function (grunt) {
	grunt.initConfig({
		eslint: {
			target: [
				"Gruntfile.js",
				"index.js",
				"lib/*.js",
				"test/*.js"
			]
		},
		nodeunit: {
			all: [
				"test/*.js"
			]
		},
		nsp: {
			package: grunt.file.readJSON("package.json")
		}
	});

	// tasks
	grunt.loadNpmTasks("grunt-eslint");
	grunt.loadNpmTasks("grunt-contrib-nodeunit");
	grunt.loadNpmTasks("grunt-nsp");

	// aliases
	grunt.registerTask("test", ["eslint", "nodeunit", "nsp"]);
	grunt.registerTask("default", ["test"]);
};
