const { Router } = require("express");
const itemController = require("../../controller/itemController");
const itemValidations = require("../../middleware/itemValidations");

const router = Router();

router.get("/", itemValidations.getItems, itemController.getItems);
router.get("/:id", itemValidations.getItemById, itemController.getItemById);
router.post("/", itemValidations.createItem, itemController.createItem);
router.put("/:id", itemValidations.updateItem, itemController.updateItem);
router.delete("/:id", itemValidations.deleteItem, itemController.deleteItem);

module.exports = router;
