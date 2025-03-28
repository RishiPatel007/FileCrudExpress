const { sendResponse } = require("../utils");
const httpStatus = require("http-status").status;

function errorHandler(err, req, res, next) {
	err.stack = err.stack
		.split("\n")
		.filter((sLine) => !sLine.includes("\\node_modules"))
		.join("\n");

	console.error(err.stack);
	sendResponse({
		res,
		nStatusCode: err.nStatusCode
			? err.nStatusCode
			: httpStatus.INTERNAL_SERVER_ERROR,
		oData: { error: err.sMessage ? err.sMessage : "Internal server error" },
	});
}

module.exports = errorHandler;
