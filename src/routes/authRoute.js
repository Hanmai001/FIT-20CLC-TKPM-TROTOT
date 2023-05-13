import { passport } from '../middleware/passport.mdw';
import { getLoginPage, getRegisterPage, checkRegister } from '../controllers/auth.controller';
import express from "express";

const authRoute = express.Router();
// Route để hiển thị trang đăng nhập
authRoute.get('/login', getLoginPage);
authRoute.get('/register', getRegisterPage)
authRoute.use(function (req, res, next) {
    res.locals.user = req.user;
    next();
});

// Route để xử lý khi submit form đăng nhập
authRoute.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/account/login',
    failureFlash: true
}));
authRoute.post('/register', checkRegister);

export default authRoute;