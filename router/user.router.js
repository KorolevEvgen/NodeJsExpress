// router - займається перенаправленням інформації далі за вказаним шляхом...

const router = require('express').Router();

const controller = require('../controller/user.controller');
const mdlwr = require('../middleware/user.middleware');

router.get('/', controller.getAllUsers); // дістати усіх
router.post('/', mdlwr.checkIsEmailUnique,controller.createUser); // створити нового

router.get('/:userId', mdlwr.checkIsUserExist, controller.getUserById); // дістати одного
router.put('/:userId', mdlwr.checkIsUserExist, controller.updateUser); // оновити одного
router.delete('/:userId', controller.deleteUserById); // видалити одного

module.exports = router;
