// craco.config.js

module.exports = {
	webpack: {
		configure: {
			ignoreWarnings: [
				function ignoreSourceMapsLoaderWarnings(warning) {
					return warning.module?.resource.includes("node_modules") && warning.details?.includes("source-map-loader");
				},
			],
		},
	},
};
