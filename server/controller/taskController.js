const asyncHandler = require("express-async-handler")
const Task = require("../modals/Task")



exports.addTask = asyncHandler(async (req, res) => {
    await Task.create(req.body)
    res.json({ message: "Task Added Success" })
})



exports.getTask = asyncHandler(async (req, res) => {
    
    const result = await Task.find()
    res.json({ message: "Task Fetch Success", result })
})


exports.deleteTask = asyncHandler(async (req, res) => {
    const { id } = req.params
    const result = await Task.findById(id)
    if (result.status === "Completed") {
        return res.json({ message: "Task Is completed" })
    } else {
        await Task.findByIdAndDelete(id)
        return res.json({ message: "Task Delete Success" })
    }

})


exports.updateTask = asyncHandler(async (req, res) => {

    const { id } = req.params
    const { status, priority } = req.body

    const result = await Task.findById(id)

    if (result.status === "Completed") {
        await Task.findByIdAndUpdate(id, { status, priority, endDate: Date.now() }, { new: true })
        return res.json({ message: "Task Updated" })
    } else {
        await Task.findByIdAndUpdate(id, { status, priority }, { new: true })
        return res.json({ message: "Task Updated" })
    }

})