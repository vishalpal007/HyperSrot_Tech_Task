const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config({ path: "./.env" })
const path = require("path")



const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static(path.join(__dirname, "dist")))


app.use("/api/task", require("./routes/taskRoutes"))


app.use("*", (req, res) => {
    // res.status(404).json({ message: "Resource Not Found" })
    res.sendFile(path.join(__dirname, "dist", "index.html"))
})


app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message || "something went wrong" })
})


mongoose.connect(process.env.MONGO_URL)

mongoose.connection.once("open", () => {
    console.log("Mongo Connected")
    app.listen(process.env.PORT, console.log("Server Running"))
})