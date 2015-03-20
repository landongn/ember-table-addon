

/*
	@landongn - shamelessly stolen from ember-cli-less
 */

var LESSCompiler = require('broccoli-less-single');
var path         = require('path');
var mergeTrees   = require('broccoli-merge-trees');

function EmberTableLESSCompiler(options) {
	this.name = 'ember-cli-less';
	this.ext = 'less';
	this.options = options;
}

EmberTableLESSCompiler.prototype.toTree = function(tree, inputPath, outputPath, options) {
	options = options || {};
	var ext = this.ext;
	var paths = options.outputPaths || { app: options.registry.app.options.outputPaths.app.css };

	var trees = Object.keys(paths).map(function(file) {
		var input = path.join(inputPath, file + '.' + ext);
		var output = paths[file];

		return new LESSCompiler([tree], input, output, options);
	});

	// continue to mutate trees here, i'd reckon.
	// (just return a new thing that returns a tree)


	return mergeTrees(trees);
};

module.exports = {
	name: 'ember-table',

	included: function(app) {

		app.import(app.bowerDirectory + '/antiscroll/antiscroll.js');
		app.import(app.bowerDirectory + '/antiscroll/antiscroll.css');
		app.import(app.bowerDirectory + '/jquery-ui/ui/jquery-ui.custom.js');
		app.import(app.bowerDirectory + '/jquery-mousewheel/jquery.mousewheel.js');

		var options = app.options.emberTableOptions || {};
		  if ((options.sourceMap === undefined) && (app.env === 'development')) {
		    options.sourceMap = true;
		  }
		  app.registry.add('css', new EmberTableLESSCompiler(options));

		// FIXME(azirbel): Need to import ember table CSS
	},

	afterInstall: function() {
		this.addBowerPackageToProject('antiscroll');
		this.addBowerPackageToProject('jquery-mousewheel');
		this.addBowerPackageToProject('jquery-ui');
	}
};
