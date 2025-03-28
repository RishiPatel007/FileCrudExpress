const { v4 } = require("uuid");
const moment = require("moment");

class Item {
	constructor({ sName = "", nQuantity = 0, nPrice = 0, sStatus = "active" }) {
		this.iId = v4();
		this.sName = sName;
		this.nQuantity = nQuantity;
		this.nPrice = nPrice;
		this.sStatus = sStatus;
		this.dCreatedAt = moment().format("Do MMMM YYYY : hh:mm:ss A");
		this.dUpdatedAt = moment().format("Do MMMM YYYY : hh:mm:ss A");
	}
}
module.exports = Item;
