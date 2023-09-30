const express = require('express');

const mongoose = require('mongoose');

const app = express();

const { PORT = 3000 } = process.env;

const routes = require('./routes');

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useCreateIndex: true,
  // useFindAndModify: false
});

app.use((req, res, next) => {
  req.user = {
    _id: '651584c0f920b65587e2dbd2',
  };

  next();
});

app.use(express.json());
app.use(routes);

app.listen(PORT);
