const httpStatus = require("http-status").status;
const moment = require("moment");
const path = require("path");

const {
	readItemsFromFile,
	sendResponse,
	ApiError,
	writeItemIntoFile,
} = require("../utils");

const Item = require("../models/itemModel");

function getItems(req, res) {
	const aData = readItemsFromFile().filter(
		(oItem) => oItem.sStatus === "active"
	);

	if (aData.length === 0) {
		throw new ApiError("No active items found", httpStatus.NOT_FOUND);
	}

	return sendResponse({ res, oData: aData, nStatusCode: httpStatus.OK });
}

function getItemById(req, res) {
	const iId = req.params.id;
	const aData = readItemsFromFile();

	const oItemData = aData.find((oItem) => oItem.iId === iId);
	if (!oItemData) {
		throw new ApiError("Item with this id not found", httpStatus.NOT_FOUND);
	}
	if (oItemData.sStatus !== "active") {
		throw new ApiError("Item not active", httpStatus.NOT_FOUND);
	}
	return sendResponse({ res, nStatusCode: httpStatus.OK, oData: oItemData });
}

function createItem(req, res) {
	const { sendMail } = require("../services/emailService");

	const oItemData = req.body;
	oItemData.nQuantity = +oItemData.nQuantity;
	oItemData.nPrice = +oItemData.nPrice;

	let aData = readItemsFromFile();
	if (aData.find((oItem) => oItem.sName === oItemData.sName)) {
		throw new ApiError(
			"Item with this name already exist",
			httpStatus.BAD_REQUEST
		);
	}

	const oItem = new Item(oItemData);
	aData.push(oItem);

	writeItemIntoFile({ aData })
		.then(() => {
			if (
				!process.env.nodemailer_email ||
				!process.env.nodemailer_password ||
				!process.env.nodemailer_sendTo
			) {
				return sendResponse({
					res,
					nStatusCode: httpStatus.CREATED,
					oData: "Item created successfully but email not sent",
					sContentType: "text/plain",
				});
			}
			sendMail(
				path.join(__dirname, "..", "views", "addItemEmail.ejs"),
				{ item: oItem },
				process.env.nodemailer_sendTo,
				"Added Item !!!"
			);
			return sendResponse({
				res,
				nStatusCode: httpStatus.CREATED,
				oData: "Item created successfully and email sent",
				sContentType: "text/plain",
			});
		})
		.catch((err) => {
			throw new ApiError(
				"Error writing in file",
				httpStatus.INTERNAL_SERVER_ERROR
			);
		});
}

function updateItem(req, res) {
	const iId = req.params.id;
	const oItemData = req.body;
	oItemData.nQuantity = +oItemData.nQuantity;
	oItemData.nPrice = +oItemData.nPrice;

	const aData = readItemsFromFile();

	if (
		aData.find(
			(oItem) => oItem.sName === oItemData.sName && oItem.iId !== iId
		)
	) {
		throw new ApiError(
			"Other Item with this name already exist",
			httpStatus.BAD_REQUEST
		);
	}

	let oOldItemData = aData.find((oItem) => oItem.iId === iId);
	if (!oOldItemData) {
		throw new ApiError(
			"Item with this id doesn't exits",
			httpStatus.NOT_FOUND
		);
	}

	Object.assign(oOldItemData, oItemData, {
		dUpdatedAt: moment().format("Do MMMM YYYY : hh:mm:ss A"),
	});

	writeItemIntoFile({ aData })
		.then(() => {
			return sendResponse({
				res,
				nStatusCode: httpStatus.OK,
				oData: "Item updated successfully",
				sContentType: "text/plain",
			});
		})
		.catch((err) => {
			throw new ApiError(
				"Error writing in file",
				httpStatus.INTERNAL_SERVER_ERROR
			);
		});
}

function deleteItem(req, res) {
	const iId = req.params.id;
	let aData = readItemsFromFile();

	let oOldItemData = aData.find((oItem) => oItem.iId === iId);

	if (!oOldItemData) {
		throw new ApiError(
			"Item with this id doesn't exits",
			httpStatus.NOT_FOUND
		);
	}

	aData = aData.filter((oItem) => oItem.iId !== iId);

	writeItemIntoFile({ aData })
		.then(() => {
			return sendResponse({
				res,
				nStatusCode: httpStatus.OK,
				oData: "Item deleted successfully",
				sContentType: "text/plain",
			});
		})
		.catch((err) => {
			throw new ApiError(
				"Error writing in file",
				httpStatus.INTERNAL_SERVER_ERROR
			);
		});
}

module.exports = { createItem, getItems, getItemById, updateItem, deleteItem };
