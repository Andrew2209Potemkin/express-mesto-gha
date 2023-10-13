const rateLimiter = require('express-rate-limit');

module.exports.limiter = rateLimiter({
  max: 160,
  windowMS: 55000,
  message: 'Превышено количество запросов на сервер. Пожалуйста, попробуйте повторить позже',
});
