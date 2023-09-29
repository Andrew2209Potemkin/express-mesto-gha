const express = require('express');

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const usersRouter = require('./routes/users');

const cardsRouter = require('./routes/cards');

const app = express();

const { PORT = 3000 } = process.env;

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

app.use(bodyParser.json());
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.use('*', (req, res) => res.status(404).send({ message: 'Страница не найдена' }));
app.listen(PORT);
