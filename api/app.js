const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const helmet = require('helmet')
const morgan = require('morgan')
const userRoute = require('./routes/users')
const authRoute = require('./routes/auth')
const postRoute = require('./routes/posts')
const multer = require("multer")
const path = require("path")

dotenv.config()

const app = express()

// instead of making a get request to this path it will show the contents
app.use("/images", express.static(path.join(__dirname, "public/images")))

app.use(express.json())
app.use(helmet())
app.use(morgan('common'))
app.use(express.static("public"));

//file uploading to a destination
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images");
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    }
});
const upload = multer({ storage })

app.post("/api/upload", upload.single("file"), (req, res) => {
    try {
        return res.status(200).json("File uploaded successfully")
    } catch (err) {
        console.log(err)
    }
})

//routes
app.use('/api/users', userRoute)
app.use('/api/auth', authRoute)
app.use('/api/posts', postRoute)

mongoose.connect(process.env.MONGO_URL, { useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB')
    })

app.listen(8800, () => {
    console.log("Server started on port 8800")
})