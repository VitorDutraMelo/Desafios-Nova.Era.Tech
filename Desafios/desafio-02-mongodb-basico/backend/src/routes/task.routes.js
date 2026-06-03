const express = require("express");
const TaskController = require("../controllers/task.controller");

const router = express.Router();

router.post("/", TaskController.create);
router.get("/", TaskController.findAll);
router.patch("/:id/status", TaskController.updateStatus);
router.delete("/:id", TaskController.remove);

module.exports = router;