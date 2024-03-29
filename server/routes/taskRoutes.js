const { addTask, getTask, deleteTask, updateTask } = require("../controller/taskController")

const router = require("express").Router()


router
    .get("/", getTask)
    .post("/add", addTask)
    .delete("/delete/:id", deleteTask)
    .put("/update/:id", updateTask)


module.exports = router