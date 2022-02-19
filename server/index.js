require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const router = require('./routes/index')
const path = require('path')
const fileUpload = require('express-fileupload')
const ErrorHandlingMiddleware = require('./middleware/ErrorHandlingMiddleware')


const PORT = process.env.PORT || 5000

const app = express()

app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }))
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)
app.use(ErrorHandlingMiddleware)

const start = async () => {
   try {
      await mongoose.connect(process.env.DB_URL)
      app.listen(PORT, () => console.log(`Server start on port: ${PORT}`))
   } catch (e) {
      console.log(e)
   }
}

start()