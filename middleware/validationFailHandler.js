const { validationResult } = require("express-validator");
const { ApiError } = require("../utils");
const httpStatus = require("http-status").status;

module.exports = function validationFailHandler(req, res, next) {
	if (!validationResult(req).isEmpty()) {
		const errors = [];
		validationResult(req).errors.forEach((oElement) => {
			errors.push(oElement.msg);
		});
		throw new ApiError(errors, httpStatus.BAD_REQUEST);
	}
	next();
};
