const router = require('express').Router();

const usersRouter = require('./users');

const cardsRouter = require('./cards');

const ERROR_CODE_NOT_FOUND = 404;

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);

router.use('*', (req, res) => res.status(ERROR_CODE_NOT_FOUND).send({ message: 'Страница не найдена' }));

module.exports = router;
