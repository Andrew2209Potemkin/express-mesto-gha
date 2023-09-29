const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => {
      if (err) {
        res.status(404).send({ message: 'Запрашиваемые пользователи не найдены' });
      }
    });
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => res.send(user))
    .catch((err) => {
      if (err) {
        res.status(404).send({ message: 'Запрашиваемый пользователь не найден' });
      }
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err) {
        res.status(400).send({ message: 'Переданы некорректные данные' });
      }
    });
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true },
  )
    .then((user) => res.send(user))
    .catch((err) => {
      if (err) {
        res.status(400).send({ message: 'Переданы некорректные данные' });
      }
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true },
  )
    .then((user) => res.send(user))
    .catch((err) => {
      if (err) {
        res.status(400).send({ message: 'Переданы некорректные данные' });
      }
    });
};
