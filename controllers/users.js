const User = require('../models/user');

const ERROR_CODE_VALIDATION = 400;

const ERROR_CODE_NOT_FOUND = 404;

// const ERROR_CODE_SERVER = 500;

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => console.log(`Произошла ошибка: ${err.name} ${err.message}`));
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => res.status(ERROR_CODE_NOT_FOUND).send({ message: 'Пользователь по указанному _id не найден' }))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_CODE_VALIDATION).send({ message: 'Переданы некорректные данные' });
      }
      if (err.message === 'NotFound') {
        res.status(ERROR_CODE_NOT_FOUND).send({ message: 'Пользователь по указанному _id не найден' });
      }
      console.log(`Произошла ошибка: ${err.name} ${err.message}`);
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE_VALIDATION).send({ message: 'Переданы некорректные данные' });
      }
      console.log(`Произошла ошибка: ${err.name} ${err.message}`);
    });
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true },
  )
    .orFail(() => res.status(ERROR_CODE_NOT_FOUND).send({ message: 'Пользователь по указанному _id не найден' }))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        res.status(ERROR_CODE_VALIDATION).send({ message: 'Переданы некорректные данные' });
      }
      console.log(`Произошла ошибка: ${err.name} ${err.message}`);
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true },
  )
    .orFail(() => res.status(ERROR_CODE_NOT_FOUND).send({ message: 'Пользователь по указанному _id не найден' }))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        res.status(ERROR_CODE_VALIDATION).send({ message: 'Переданы некорректные данные' });
      }
      console.log(`Произошла ошибка: ${err.name} ${err.message}`);
    });
};
