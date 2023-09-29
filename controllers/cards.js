const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => {
      if (err) {
        res.status(404).send({ message: 'Запрашиваемые карточки не найдены' });
      }
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err) {
        res.status(400).send({ message: 'Переданы некорректные данные' });
      }
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findById(req.params.cardId)
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
    .then((card) => res.send(card))
    .catch((err) => console.log(`Произошла ошибка: ${err.name} ${err.message}`));
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.send(card))
    .catch((err) => console.log(`Произошла ошибка: ${err.name} ${err.message}`));
};
