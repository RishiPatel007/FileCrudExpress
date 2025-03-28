const { validate, version } = require("uuid");
const { ApiError, validateFields } = require("../utils");
const httpStatus = require("http-status").status;

function getItems(req, res, next) {
	return next();
}

function getItemById(req, res, next) {
	const iId = req.params.id;
	if (!validate(iId) || version(iId) !== 4) {
		throw new ApiError("Invalid uuid Id", httpStatus.BAD_REQUEST);
	}

	return next();
}

function createItem(req, res, next) {
	const oItemData = req.body;
	if (
		!Object.hasOwn(oItemData, "sName") ||
		!Object.hasOwn(oItemData, "nQuantity") ||
		!Object.hasOwn(oItemData, "nPrice")
	) {
		throw new ApiError(
			"Invalid Item Data (Missing Fields)",
			httpStatus.BAD_REQUEST
		);
	}

	if (Object.keys(oItemData).length > 3) {
		throw new ApiError(
			"Invalid Item Data (Extra Fields)",
			httpStatus.BAD_REQUEST
		);
	}

	if (!validateFields(oItemData)) {
		throw new ApiError(
			"Invalid Item Data (Wrong Data Types / Values)",
			httpStatus.BAD_REQUEST
		);
	}

	oItemData.nQuantity = +oItemData.nQuantity;
	oItemData.nPrice = +oItemData.nPrice;

	return next();
}

function updateItem(req, res, next) {
	const iId = req.params.id;
	if (!validate(iId) || version(iId) !== 4) {
		throw new ApiError("Invalid uuid Id", httpStatus.BAD_REQUEST);
	}

	const oItemData = req.body;
	if (
		!Object.hasOwn(oItemData, "sName") ||
		!Object.hasOwn(oItemData, "nQuantity") ||
		!Object.hasOwn(oItemData, "nPrice") ||
		!Object.hasOwn(oItemData, "sStatus")
	) {
		throw new ApiError(
			"Invalid Item Data (Missing Fields)",
			httpStatus.BAD_REQUEST
		);
	}

	if (Object.keys(oItemData).length > 4) {
		throw new ApiError(
			"Invalid Item Data (Extra Fields)",
			httpStatus.BAD_REQUEST
		);
	}

	if (!validateFields(oItemData)) {
		throw new ApiError(
			"Invalid Item Data (Wrong Data Types / Values)",
			httpStatus.BAD_REQUEST
		);
	}

	oItemData.nQuantity = +oItemData.nQuantity;
	oItemData.nPrice = +oItemData.nPrice;
	return next();
}

function deleteItem(req, res, next) {
	const iId = req.params.id;
	if (!validate(iId) || version(iId) !== 4) {
		throw new ApiError("Invalid uuid Id", httpStatus.BAD_REQUEST);
	}
	return next();
}

module.exports = { getItems, getItemById, createItem, updateItem, deleteItem };
