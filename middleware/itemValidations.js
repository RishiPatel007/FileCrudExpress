const { body, param } = require("express-validator");

function getOrDeleteItemById() {
	return [param("id").isUUID(4).withMessage("Invalid uuid Id")];
}

function createOrUpdateItem(nFields) {
	const aValidationArray = [
		body()
			.custom((value) => {
				if (Object.keys(value).length === 0) {
					throw new Error("Body Required");
				}
				return true;
			})
			.isObject()
			.withMessage("Body must be an Object")
			.custom((value) => {
				if (Object.keys(value).length > nFields) {
					throw new Error("Extra Fields");
				}
				return true;
			}),
		body("sName")
			.notEmpty()
			.withMessage("sName required")
			.isAlphanumeric()
			.withMessage("sName must be AlphaNumeric"),
		body("nPrice")
			.notEmpty()
			.withMessage("nPrice required")
			.isNumeric()
			.withMessage("nPrice must be Numeric"),
		body("nQuantity")
			.notEmpty()
			.withMessage("nQuantity required")
			.isNumeric()
			.withMessage("nQuantity must be Numeric"),
	];
	if (nFields === 4) {
		aValidationArray.unshift(
			param("id").isUUID(4).withMessage("Invalid uuid Id")
		);
		aValidationArray.push(
			body("sStatus")
				.notEmpty()
				.withMessage("sStatus required")
				.isIn(["active", "inactive"])
				.withMessage("sStatus must be active or inactive")
		);
	}
	return aValidationArray;
}

module.exports = {
	getOrDeleteItemById,
	createOrUpdateItem,
};
