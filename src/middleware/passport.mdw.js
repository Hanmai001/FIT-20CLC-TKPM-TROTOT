import passport from 'passport';
import LocalStrategy from 'passport-local';
import { checkUserCredential } from '../models/auth.model';


passport.use(new LocalStrategy(
    {
        usernameField: 'TaiKhoan',
        passwordField: 'MatKhau',
        iduserField: 'nguoidungID',
        typeuserField: 'loainguoidung'
    },
    async function (TaiKhoan, MatKhau, done) {

        // console.log('TaiKhoan:', TaiKhoan);
        // console.log('MatKhau:', MatKhau);

        const user = await checkUserCredential(TaiKhoan, MatKhau);
        if (!user) {
            return done(null, false, { message: "Sai tài khoản hoặc mật khẩu!!" });
        }
        return done(null, user);
    }
));
passport.serializeUser(function (user, done) {
    process.nextTick(function () {
        done(null, { id: user.NguoiDungID, username: user.TaiKhoan, LoaiNguoiDung: user.LoaiNguoiDung });
    });
});
passport.deserializeUser(function (user, done) {
    process.nextTick(function () {
        return done(null, user);
    });
});

export { passport };
