const Card = require('../models/card');

const ERROR_CODE_VALIDATION = 400;

const ERROR_CODE_NOT_FOUND = 404;

const ERROR_CODE_SERVER = 500;

const STATUS_CODE_OBJECT_CREATED = 201;

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => {
      res.status(ERROR_CODE_SERVER).send({ message: 'На сервере произошла ошибка' });
      console.log(`Произошла ошибка: ${err.name} ${err.message}`);
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.status(STATUS_CODE_OBJECT_CREATED).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE_VALIDATION).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(ERROR_CODE_SERVER).send({ message: 'На сервере произошла ошибка' });
        console.log(`Произошла ошибка: ${err.name} ${err.message}`);
      }
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findById(req.params.cardId)
    .orFail(() => res.status(ERROR_CODE_NOT_FOUND).send({ message: '_id карточки не найден' }))
    .then((card) => {
      if (card) {
        Card.findByIdAndRemove(req.params.cardId)
          .then((myCard) => res.send(myCard))
          .catch((err) => console.log(`Произошла ошибка: ${err.name} ${err.message}`));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_CODE_VALIDATION).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(ERROR_CODE_SERVER).send({ message: 'На сервере произошла ошибка' });
        console.log(`Произошла ошибка: ${err.name} ${err.message}`);
      }
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => res.status(ERROR_CODE_NOT_FOUND).send({ message: '_id карточки не найден' }))
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_CODE_VALIDATION).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(ERROR_CODE_SERVER).send({ message: 'На сервере произошла ошибка' });
        console.log(`Произошла ошибка: ${err.name} ${err.message}`);
      }
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => res.status(ERROR_CODE_NOT_FOUND).send({ message: '_id карточки не найден' }))
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_CODE_VALIDATION).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(ERROR_CODE_SERVER).send({ message: 'На сервере произошла ошибка' });
        console.log(`Произошла ошибка: ${err.name} ${err.message}`);
      }
    });
};
