const Card = require('../models/card');

const ERROR_CODE_VALIDATION = 400;

const ERROR_CODE_NOT_FOUND = 404;

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => console.log(`Произошла ошибка: ${err.name} ${err.message}`));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE_VALIDATION).send({ message: 'Переданы некорректные данные' });
      }
      console.log(`Произошла ошибка: ${err.name} ${err.message}`);
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findById(req.params.cardId)
    .orFail(() => res.status(ERROR_CODE_NOT_FOUND).send({ message: '_id карточки не найден' }))
    .then((card) => {
      card.remove();
      res.send({ message: 'Карточка удалена' });
    })
    .catch((err) => console.log(`Произошла ошибка: ${err.name} ${err.message}`));
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
      }
      if (err.message === 'NotFound') {
        res.status(ERROR_CODE_NOT_FOUND).send({ message: '_id карточки не найден' });
      }
      console.log(`Произошла ошибка: ${err.name} ${err.message}`);
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
      }
      if (err.message === 'NotFound') {
        res.status(ERROR_CODE_NOT_FOUND).send({ message: '_id карточки не найден' });
      }
      console.log(`Произошла ошибка: ${err.name} ${err.message}`);
    });
};
