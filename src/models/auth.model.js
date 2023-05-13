import db from "../config/db.config";
import bcrypt from "bcrypt"

// const getUserByUsername = async (id) => {
//     const user = await db('nguoidung').where('TaiKhoan', username).first();
//     return user;
// };
const getUserByUsername = async (username) => {
    const user = await db('nguoidung').where('TaiKhoan', username).first();
    return user;
};
const getUserByEmail = async (email) => {
    const user = await db('nguoidung').where('Email', email).first();
    return user;
};
const getUserByPhone = async (phone) => {
    const user = await db('nguoidung').where('SDT', phone).first();
    return user;
};
const checkPasswordValidity = async (password) => {
    if (password.length < 6) {
        return false;
    }

    const firstChar = password.charAt(0);
    if (firstChar !== firstChar.toUpperCase()) {
        return false;
    }

    return true;
}

const addUser = async (username, email, password, dob, fullname, phone, sex, cities, district, ward, street) => {
    console.log(addUser)
    try {
        await db('nguoidung').insert({
            HoTen: fullname,
            SDT: phone,
            DiaChi: street + ', ' + ward + ', ' + district + ', ' + cities,
            GioiTinh: sex,
            NgaySinh: dob,
            Email: email,
            TaiKhoan: username,
            MatKhau: password,
        });
        return true;
    } catch (error) {
        console.log('Error adding user: ', error);
        return false;
    }
};

const checkUserCredential = async (TaiKhoan, MatKhau, id) => {
    const user = await getUserByUsername(TaiKhoan);
    //console.log(user)
    if (!user) {
        return null;
    }
    const isMatch = await bcrypt.compare(MatKhau, user.MatKhau);
    if (isMatch) {
        return user;
    } else {
        return null;
    }
};

const findUserById = async (id) => {
    const user = await db('nguoidung').where('NguoiDungID', id).first();
    return user;
}
export { checkUserCredential, findUserById, addUser, getUserByEmail, getUserByUsername, getUserByPhone, checkPasswordValidity }