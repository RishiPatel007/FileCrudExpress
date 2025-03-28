const { Router } = require("express");
const publicController = require("../../controller/publicController");
const publicValidations = require("../../middleware/publicValidations");

const router = Router();

router.get("/:file", publicValidations.getFile, publicController.getFile);

module.exports = router;
