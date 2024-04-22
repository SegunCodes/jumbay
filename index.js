const express = require("express");
const dotenv = require("dotenv").config()
const cors = require("cors");
const authRoutes = require("./src/routes/AuthRoutes");
const userRoutes = require("./src/routes/UserRoutes");
const port = process.env.PORT || 4006

const app = express()
app.use(express.json())
app.use(cors())
//import your routes
app.get("/", (req, res) => {
    res.json({status:"success"})
})
app.use('/user', userRoutes)
app.use('/auth', authRoutes)

app.listen(port, () => console.log(`Server started on port ${port}`))