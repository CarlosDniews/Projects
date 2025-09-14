const express = require("express");
const router = express.Router();

const studentController = require("../controllers/student.controller");

// list
router.get("/", studentController.getAllStudents);

// create
router.post("/", studentController.createStudent);

// update
router.put("/:id", studentController.updateStudent);

// delete
router.delete("/:id", studentController.deleteStudent);

module.exports = router;
