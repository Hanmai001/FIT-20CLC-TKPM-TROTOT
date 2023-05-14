import bcrypt from 'bcrypt';
import { addUser } from '../models/auth.model';
import { getUserByEmail } from '../models/auth.model';
import { getUserByUsername } from '../models/auth.model';
import { checkPasswordValidity } from '../models/auth.model';

const isLoggedCustomer = async (req, res, next) => {
    if (req.isAuthenticated() && req.session.passport.user.LoaiNguoiDung == 'Người thuê trọ') {
        return next();
    } else {
        return res.send("Bạn không có quyền truy cập trang này!");
    }
}
const isLoggedLandlord = async (req, res, next) => {
    if (req.isAuthenticated() && req.session.passport.user.LoaiNguoiDung == 'Người chủ trọ') {
        return next();
    } else {
        return res.send("Bạn không có quyền truy cập trang này!");
    }
}

const isLoggedAdmin = async (req, res, next) => {
    if (req.isAuthenticated() && req.session.passport.user.LoaiNguoiDung == 'Admin') {
        return next();
    } else {
        return res.send("Bạn không có quyền truy cập trang này!");
    }
}
const isLogged = async (req, res, next) => {
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


const getLoginPage = async (req, res) => {
    //console.log(req.session)
    res.render('vwAccount/login', { messages: { error: req.flash('error'), success: req.flash('success') } });
};
const getRegisterPage = async (req, res) => {
    res.render('vwAccount/register', { messages: { error: req.flash('error'), success: req.flash('success') } });
};
const checkRegister = async (req, res) => {
    const {
        username,
        email,
        password,
        confirm_password,
    } = req.body;
    //  console.log(req.body)
    // Kiểm tra các trường dữ liệu có được điền đầy đủ
    if (
        !username ||
        !email ||
        !password ||
        !confirm_password
    ) {

        req.flash('error', 'Vui lòng nhập đầy đủ thông tin!');
        return res.redirect('/account/register');
    }
    // Kiểm tra tính hợp lệ của mật khẩu
    const checkPassword = await checkPasswordValidity(password)
    if (!checkPassword) {
        req.flash('error', 'Mật khẩu không hợp lệ!');
        return res.redirect('/account/register');
    }
    // Kiểm tra tài khoản đã tồn tại chưa
    const userByUsername = await getUserByUsername(username);
    if (userByUsername) {
        req.flash('error', 'Tài khoản đã được sử dụng. Vui lòng chọn tài khoản khác!');
        return res.redirect('/account/register');
    }
    // Kiểm tra email đã được đăng ký trước đó chưa
    const user = await getUserByEmail(email);
    if (user) {
        req.flash('error', 'Email đã được sử dụng. Vui lòng chọn email khác!');
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
        email,
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


export { getLoginPage, getRegisterPage, checkRegister, isLogged, isLoggedAdmin, isLoggedLandlord, isLoggedCustomer }
