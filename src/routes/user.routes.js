const express = require("express");
const router = express.Router();

const controller = require("./../controllers/user.controller");

router.get("/", controller.getAll);
router.post("/", controller.insert);
router.get("/:id", controller.findById);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

module.exports = router;
