const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
require('dotenv/config');

//import routes
const postRoute = require('./routes/post');

app.use(bodyParser.json());
 app.use('/', postRoute);
 


mongoose.connect(process.env.DB_CONNECTION,
{
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

  

const port = process.env.PORT || 3000;
app.listen(3000, () => console.log(`Server is listening to PORT ${port}`));




