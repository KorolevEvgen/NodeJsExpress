// middleware - це функція, яка займається проміжною обробкою даних(усі перевірки до controller)...
// має в собі req, res, next
// next присутній тільки у middleware
// next - дає middleware змогу перейти до наступного обробника(middleware, controller)

const User = require('../dataBase/User');
const ApiError = require('../error/ApiError');

module.exports = {
    checkIsUserExist: async (req, res, next) => {
        try {
            const { userId } = req.params;

            const user = await User.findById(userId);

            if (!user) {
                throw new ApiError('User not found',404);
            }

            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    },
    checkIsEmailUnique: async (req, res, next) => {
        try {
            const { email } = req.body;

            if (!email){
                throw new ApiError('Email not present',400)
            }

            const user = await User.findOne({ email });

            if (user) {
                throw new ApiError('User with this email already exists',409);
            }

            next();
        } catch (e) {
            next(e);
        }
    },
};
