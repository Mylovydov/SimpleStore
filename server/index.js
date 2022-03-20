require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const router = require('./routes/index');
const path = require('path');
const fileUpload = require('express-fileupload');
const ErrorHandlingMiddleware = require('./middleware/ErrorHandlingMiddleware');
const https = require('https');
const fs = require('fs');
const bodyParser = require('body-parser')
const webhookRouter = require('./routes/shop/webhookRouter')

const PORT = process.env.PORT || 5000;

// const sslOptions = {
//   key: fs.readFileSync('key.pem'),
//   cert: fs.readFileSync('cert.pem')
// };

const app = express();

app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
  })
);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", '*');
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use('/api/webhook', bodyParser.raw({type: 'application/json'}), webhookRouter);

app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(fileUpload({}));
app.use('/api', router);
app.use(ErrorHandlingMiddleware);

// const start = async () => {
//   try {
//     await mongoose.connect(process.env.DB_URL);
//     https.createServer(sslOptions, app).listen(PORT, () => console.log(`Server start on port: ${PORT}`));
//   } catch (e) {
//     console.log(e);
//   }
// };

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    app.listen(PORT, () => console.log(`Server start on port: ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();