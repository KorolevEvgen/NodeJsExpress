const router = require('express').Router();

const controller = require('../controller/auth.controller');
const authMdlwr = require('../middleware/auth.middleware');
const userMdlwr = require('../middleware/user.middleware');


router.post('/login', authMdlwr.isBodyValid, userMdlwr.getUserDynamically('email'), controller.login);

router.post('/refresh',authMdlwr.checkRefreshToken,controller.refresh);

router.post('/password/forgot',userMdlwr.getUserDynamically('email'),controller.forgotPassword);

router.put('/password/forgot',authMdlwr.checkActionToken, controller.forgotPasswordAfterForgot);

module.exports = router;
