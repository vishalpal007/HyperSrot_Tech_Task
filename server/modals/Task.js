const mongoose = require("mongoose")



const taskSchema = new mongoose.Schema({
    title: String,
    description: String,
    team: String,
    startDate: {
        type: Date,
        default: Date.now
    },
    endDate: Date,
    status: {
        type: String,
        default: "Pending",
        enum: ['Pending', 'In Progress', 'Completed', 'Deployed', 'Deffered']
    },
    assignee: String,
    priority: {
        type: String,
        enum: ['P0', 'P1', 'P2']
    }

})

module.exports = mongoose.model("task", taskSchema)