require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const models = require('./models/models.js');
const cors = require('cors');
const router = require('./routes/index');

const PORT = process.env.PORT || 5000;

const app = express();
// set up cors
app.use(cors());
// set up that our app can parse .json format
app.use(express.json());
app.use('/api', router);

// checking if server is working
// app.get('/', (req, res) => {
//   res.status(200).json({ message: 'Working!' });
// });

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();