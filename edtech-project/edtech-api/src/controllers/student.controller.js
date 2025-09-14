const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// LIST
exports.getAllStudents = async (req, res) => {
  try {
    const students = await prisma.student.findMany({
      orderBy: { name: "asc" },
    });
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: "Error student not found.", error });
  }
};

// CREATE
exports.createStudent = async (req, res) => {
  try {
    const newStudent = await prisma.student.create({
      data: req.body,
    });
    res
      .status(201)
      .json({ message: "Student created successfully!", student: newStudent });
  } catch (error) {
    if (error.code === "P2002") {
      return res
        .status(409)
        .json({ message: `Conflict: ${error.meta.target[0]} already exists.` });
    }
    res.status(500).json({ message: "Error creating student.", error });
  }
};

// UPDATE
exports.updateStudent = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  try {
    const updatedStudent = await prisma.student.update({
      where: { id: parseInt(id) },
      data: { name, email },
    });
    res.status(200).json({
      message: "Student updated successfully!",
      student: updatedStudent,
    });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ message: "Student not found." });
    }
    res.status(500).json({ message: "Error updating student.", error });
  }
};

// DELETE
exports.deleteStudent = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.student.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json({ message: "Student deleted successfully!" });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ message: "Student not found." });
    }
    res.status(500).json({ message: "Error deleting student.", error });
  }
};
