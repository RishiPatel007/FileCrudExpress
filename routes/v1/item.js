const { Router } = require("express");
const itemController = require("../../controller/itemController");
const itemValidations = require("../../middleware/itemValidations");
const validationFailHandler = require("../../middleware/validationFailHandler");

const router = Router();

router.get("/", itemController.getItems);
router.get(
	"/:id",
	itemValidations.getOrDeleteItemById(),
	validationFailHandler,
	itemController.getItemById
);
router.post(
	"/",
	itemValidations.createOrUpdateItem(3),
	validationFailHandler,
	itemController.createItem
);
router.put(
	"/:id",
	itemValidations.createOrUpdateItem(4),
	validationFailHandler,
	itemController.updateItem
);
router.delete(
	"/:id",
	itemValidations.getOrDeleteItemById(),
	validationFailHandler,
	itemController.deleteItem
);

module.exports = router;
