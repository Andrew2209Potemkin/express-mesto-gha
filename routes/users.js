const router = require('express').Router();

const {
  getUsers,
  getUser,
  updateProfile,
  updateAvatar,
  getCurrentUser,
} = require('../controllers/users');
const {
  validationUserId,
  validationUpdateProfile,
  validationUpdateAvatar,
} = require('../middlewares/validationData');

router.get('/', getUsers);
router.get('/:userId', validationUserId, getUser);
router.get('/me', getCurrentUser);
router.patch('/me', validationUpdateProfile, updateProfile);
router.patch('/me/avatar', validationUpdateAvatar, updateAvatar);

module.exports = router;
