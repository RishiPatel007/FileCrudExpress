const express = require("express");
const itemRouter = require("./item");
const publicRouter = require("./public");

const router = express.Router();

router.use("/api/data", itemRouter);
router.use("/public", publicRouter);

module.exports = router;
