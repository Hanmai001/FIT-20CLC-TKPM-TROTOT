import bcrypt from 'bcrypt';
import { addUser, getUserByPhone, getUserByUsername } from '../models/user.model';


const isLoggedCustomer = async (req, res, next) => {
    if (req.isAuthenticated() && req.session.passport.user.LoaiNguoiDung == 'Người thuê trọ') {
        return next();
    } else {
        return res.render("401.hbs")
    }
}
const isLoggedLandlord = async (req, res, next) => {
    if (req.isAuthenticated() && req.session.passport.user.LoaiNguoiDung == 'Người chủ trọ') {
        return next();
    } else {
        return res.render("401.hbs")
    }
}

const isLoggedAdmin = async (req, res, next) => {
    if (req.isAuthenticated() && req.session.passport.user.LoaiNguoiDung == 'Admin') {
        return next();
    } else {
        return res.render("401.hbs")
    }
}
const isLogged = async (req, res, next) => {
    //console.log(req.session.passport.user)
    if (req.isAuthenticated()) {
        const loaiNguoiDung = req.session.passport.user.LoaiNguoiDung;
        if (loaiNguoiDung == 'Người thuê trọ' || loaiNguoiDung == 'Người chủ trọ' || loaiNguoiDung == 'Admin') {
            return next();
        } else {
            // Nếu đã đăng nhập nhưng chưa có role thì đưa đến trang chủ
            return res.redirect('/');
        }
    } else {
        return next();
    }
}
const logout = async (req, res, next) => {
    try {
        req.session.destroy((err) => {
            if (err) {
                throw err;
            }
            res.redirect('/');
        });
    } catch (err) {
        next(err);
    }
};

const getLoginPage = async (req, res) => {
    //console.log(req.session)
    res.render('vwAccount/login', { messages: { error: req.flash('error'), success: req.flash('success') } });
};
const getRegisterPage = async (req, res) => {
    res.render('vwAccount/register', { messages: { error: req.flash('error'), success: req.flash('success') } });
};

const checkPasswordValidity = (password) => {
    if (password.length < 6) {
        return false;
    }
    return true;
}

const checkRegister = async (req, res) => {
    const {
        username,
        phone,
        password,
        confirm_password,
    } = req.body;
    //  console.log(req.body)
    // Kiểm tra các trường dữ liệu có được điền đầy đủ
    if (
        !username ||
        !phone ||
        !password ||
        !confirm_password
    ) {

        req.flash('error', 'Vui lòng nhập đầy đủ thông tin!');
        return res.redirect('/account/register');
    }
    // Kiểm tra tính hợp lệ của mật khẩu
    const checkPassword = checkPasswordValidity(password);
    if (!checkPassword) {
        req.flash('error', 'Mật khẩu phải đủ 6 ký tự và viết hoa chữ cái đầu!');
        return res.redirect('/account/register');
    }
    // Kiểm tra tài khoản đã tồn tại chưa
    const userByUsername = await getUserByUsername(username);
    if (userByUsername) {
        req.flash('error', 'Tài khoản đã được sử dụng. Vui lòng chọn tài khoản khác!');
        return res.redirect('/account/register');
    }
    // Kiểm tra số điện thoại đã được đăng ký trước đó chưa
    const user = await getUserByPhone(phone);
    if (user) {
        req.flash('error', 'Số điện thoại đã được sử dụng. Vui lòng chọn số điện thoại khác!');
        return res.redirect('/account/register');
    }

    // Kiểm tra mật khẩu nhập lại có khớp với mật khẩu được nhập ban đầu không
    if (password !== confirm_password) {
        req.flash('error', 'Mật khẩu nhập lại không khớp!');
        return res.redirect('/account/register');
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Lưu thông tin tài khoản vào cơ sở dữ liệu
    const result = await addUser(
        username,
        phone,
        hashedPassword,
        "Người thuê trọ"
    );
    if (!result) {
        req.flash('error', 'Đã có lỗi xảy ra. Vui lòng thử lại sau!');
        return res.redirect('/account/register');
    }
    // Đăng ký thành công, chuyển hướng về trang đăng nhập
    req.flash('success', 'Đăng ký tài khoản thành công!');
    return res.redirect('/account/login');
};


export { getLoginPage, getRegisterPage, checkRegister, isLogged, isLoggedAdmin, isLoggedLandlord, isLoggedCustomer, logout }
