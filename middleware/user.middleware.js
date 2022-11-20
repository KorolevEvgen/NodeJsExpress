// middleware - це функція, яка займається проміжною обробкою даних(усі перевірки до controller)...
// має в собі req, res, next
// next присутній тільки у middleware
// next - дає middleware змогу перейти до наступного обробника(middleware, controller)

const userDb = require('../dataBase/users');
const ApiError = require('../error/ApiError');

module.exports = {
    checkIsUserExist: (req, res, next) => {
        try {
            const { userId } = req.params;

            const user = userDb[userId];

            if (!user) {
                throw new ApiError('User not found',503);
            }

            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    }
};
