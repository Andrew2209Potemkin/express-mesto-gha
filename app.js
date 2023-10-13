const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { validationLogin, validationCreateUser } = require('./middlewares/validationData');
const limiter = require('./middlewares/rateLimiters');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const { PORT = 3000 } = process.env;
const routes = require('./routes');

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(helmet());
app.use(express.json());
app.use(limiter);
app.post('/signin', validationLogin, login);
app.post('/signup', validationCreateUser, createUser);
app.use(auth);
app.use(routes);
app.use(errors());
app.use(errorHandler);

app.listen(PORT);
