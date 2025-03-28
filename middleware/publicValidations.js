const path = require("path");
const { ApiError } = require("../utils");
const httpStatus = require("http-status").status;
const fs = require("fs");

function getFile(req, res, next) {
	const sFile = req.params.file;
	try {
		if (
			!fs.statSync(path.join(__dirname, "..", "public", sFile)).isFile()
		) {
			throw "Not Found";
		}
		next();
	} catch (err) {
		throw new ApiError("File Not Found", httpStatus.NOT_FOUND);
	}
}

module.exports = { getFile };
