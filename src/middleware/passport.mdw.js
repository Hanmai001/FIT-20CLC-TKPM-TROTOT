import passport from 'passport';
import LocalStrategy from 'passport-local';
import { checkUserCredential } from '../models/user.model';

passport.use(new LocalStrategy(
    {
        usernameField: 'TaiKhoan',
        passwordField: 'MatKhau',
        iduserField: 'NguoiDungID',
        typeuserField: 'LoaiNguoiDung',
        passwordField: 'MatKhau'
    },
    async function (TaiKhoan, MatKhau, done) {
        const user = await checkUserCredential(TaiKhoan, MatKhau);
        if (user == 1) {
            return done(null, false, { message: "Tài khoản của bạn đã bị khóa!!" });
        }
        if (!user) {
            return done(null, false, { message: "Sai tài khoản hoặc mật khẩu!!" });
        }
        return done(null, user);
    }
));
passport.serializeUser(function (user, done) {
    process.nextTick(function () {
        done(null, { id: user.NguoiDungID, username: user.TaiKhoan, LoaiNguoiDung: user.LoaiNguoiDung, HoTen: user.HoTen, avatar: user.avatar });
    });
});
passport.deserializeUser(function (user, done) {
    process.nextTick(function () {
        return done(null, user);
    });
});

export { passport };
