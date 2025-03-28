const fs = require("fs");
const path = require("path");
const httpStatus = require("http-status").status;

class ApiError extends Error {
	constructor(
		sMessage = "Internal Server Error",
		nStatusCode = httpStatus.INTERNAL_SERVER_ERROR
	) {
		super(sMessage);
		this.name = "Api Error";
		this.sMessage = sMessage;
		this.nStatusCode = nStatusCode;
	}
}

function notFound(req, res, next) {
	throw new ApiError("Route Not Found", httpStatus.NOT_FOUND);
}

function sendResponse({
	res,
	nStatusCode,
	oData,
	sContentType = "application/json",
}) {
	res.set("Content-Type", sContentType);
	res.status(nStatusCode).send(oData);
}

function validateFields({ sName, nQuantity, nPrice, sStatus = "active" }) {
	if (
		typeof sName !== "string" ||
		Number.isNaN(+nQuantity) ||
		Number.isNaN(+nPrice) ||
		typeof sStatus !== "string"
	) {
		return false;
	}

	if (sStatus !== "active" && sStatus !== "inactive") {
		return false;
	}

	if (+nQuantity < 0 || +nPrice < 0) {
		return false;
	}
	return true;
}

function readItemsFromFile({
	sFilePath = path.join(__dirname, "..", "data.json"),
} = {}) {
	let oData = fs.readFileSync(sFilePath, "utf8");
	return oData ? JSON.parse(oData) : [];
}

function writeItemIntoFile({
	sFilePath = path.join(__dirname, "..", "data.json"),
	aData,
}) {
	if (!aData) {
		throw new ApiError("Data empty", httpStatus.INTERNAL_SERVER_ERROR);
	}
	return fs.promises.writeFile(sFilePath, JSON.stringify(aData));
}

module.exports = {
	readItemsFromFile,
	writeItemIntoFile,
	sendResponse,
	ApiError,
	validateFields,
	notFound,
};
