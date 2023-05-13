import bcrypt from 'bcrypt';
import { addUser } from '../models/auth.model';
import { getUserByEmail } from '../models/auth.model';
import { getUserByUsername } from '../models/auth.model';
import { getUserByPhone } from '../models/auth.model';
import { checkPasswordValidity } from '../models/auth.model';


const isLoggedCustomer = async (req, res, next) => {
    if (req.isAuthenticated() && req.session.passport.user.LoaiNguoiDung == 'Người thuê trọ') {
        return next();
    } else if (req.isUnauthenticated()) {
        return next();
    } else {
        return res.send("Bạn không có quyền truy cập trang này!");
    }
}
const isLoggedLandlord = async (req, res, next) => {
    console.log(req.session.passport.user)
    if (req.isAuthenticated() && req.session.passport.user.LoaiNguoiDung == 'Người chủ trọ') {
        return next();
    } else if (req.isUnauthenticated()) {
        return next();
    } else {
        return res.send("Bạn không có quyền truy cập trang này!");
    }
}

const isLoggedAdmin = async (req, res, next) => {
    if (req.isAuthenticated() && req.session.passport.user.LoaiNguoiDung == 'Admin') {
        return next();
    } else if (req.isUnauthenticated()) {
        return next();
    } else {
        return res.send("Bạn không có quyền truy cập trang này!");
    }
}

const isLogged = (req, res, next) => {
    if (req.isAuthenticated() && req.session.passport.user.LoaiNguoiDung == 'owner') {
        return next();
    } else if (req.isUnauthenticated()) {
        req.flash('loginMessage', 'Vui lòng đăng nhập')
        return res.redirect('/');
    } else {
        return res.redirect('/customer');
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
        fullname,
        phone,
        sex,
        dob,
        cities,
        district,
        ward,
        street
    } = req.body;
    //  console.log(req.body)
    // Kiểm tra các trường dữ liệu có được điền đầy đủ
    if (
        !username ||
        !email ||
        !password ||
        !confirm_password ||
        !fullname ||
        !phone ||
        !sex ||
        !dob ||
        !cities ||
        !district ||
        !ward ||
        !street
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
    // Kiểm tra số điện thoại đã tồn tại chưa
    const phoneExist = await getUserByPhone(phone);
    if (phoneExist) {
        req.flash('error', 'Số điện thoại đã được sử dụng. Vui lòng chọn số khác!');
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
        dob,
        fullname,
        phone,
        sex,
        cities,
        district,
        ward,
        street
    );
    if (!result) {
        req.flash('error', 'Đã có lỗi xảy ra. Vui lòng thử lại sau!');
        return res.redirect('/account/register');
    }
    // Đăng ký thành công, chuyển hướng về trang đăng nhập
    req.flash('success', 'Đăng ký tài khoản thành công!');
    return res.redirect('/account/login');
};


export { getLoginPage, getRegisterPage, checkRegister, isLogged, isLoggedAdmin, isLoggedCustomer, isLoggedLandlord }
