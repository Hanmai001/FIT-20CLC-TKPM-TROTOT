import db from "../config/db.config";
import bcrypt from "bcrypt"
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

const addUser = async (username, email, password, dob, fullname, phone, sex, cities, district, ward, street, type) => {
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
      LoaiNguoiDung: type,
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

export default {
  findAll() {
    return db('nguoidung');
  },

  async findById(id) {
    const list = await db('nguoidung').where('NguoiDungID', id);
    if (list.length === 0)
      return null;

    return list[0];
  },

  add(user) {
    delete user.id;
    return db('nguoidung').insert(user);
  },

  del(id) {
    return db('nguoidung').where('NguoiDungID', id).del();
  },

  block(id) {
    return db('nguoidung').where('NguoiDungID', id).update({
      TrangThai: 'Bị khóa'
    });
  },

  unblock(id) {
    return db('nguoidung').where('NguoiDungID', id).update({
      TrangThai: 'Hoạt động'
    });
  },


  patch(user) {
    const id = user.id;
    delete user.id;

    return db('nguoidung').where('NguoiDungID', id).update({
      HoTen: user.HoTen,
      SDT: user.SDT,
      Email: user.Email,
      TaiKhoan: user.TaiKhoan,
      GioiTinh: user.GioiTinh,
      NgaySinh: user.NgaySinh,
      LoaiNguoiDung: user.LoaiNguoiDung,
      TrangThai: user.TrangThai
    })
  },

  async findByRole(role) {
    if (role === '1') role = 'Người thuê trọ';
    else if (role === '2') role = 'Người chủ trọ';
    else role = 'Admin';

    return db('nguoidung').where('LoaiNguoiDung', role);
  },

  async countByrole(role) {
    const list = await db('nguoidung')
      .where('LoaiTaiKhoan', role)
      .count({ amount: 'NguoiDungID' });

    return list[0].amount;
  },

  findUsername(username) {
    return db('nguoidung').where('TaiKhoan', username);
  }
}

const getInfoProfileTenant = async (idUser) => {
  const res = await db('nguoidung').where('NguoiDungID', '=', idUser).select('HoTen', 'DiaChi', 'SDT', 'GioiTinh', 'NgaySinh', 'Email', 'GioiThieu', 'TaiKhoan', 'avatar');
  return res[0];
}
const updateProfileTenantModel = async (idUser, data, file) => {
  //console.log(file)
  if (file) {
    const res = await db('nguoidung').where('NguoiDungID', '=', idUser).update({
      HoTen: data.updateFullname,
      DiaChi: data.cities,
      SDT: data.updatePhone,
      GioiTinh: data.updateSex,
      GioiThieu: data.updateIntro,
      avatar: file
    })
  }
  else {
    const res = await db('nguoidung').where('NguoiDungID', '=', idUser).update({
      HoTen: data.updateFullname,
      DiaChi: data.cities,
      SDT: data.updatePhone,
      GioiTinh: data.updateSex,
      GioiThieu: data.updateIntro,
    })
  }

}
const getInfoProfileLandlord = async (idUser) => {
  const res = await db('nguoidung').where('NguoiDungID', '=', idUser).select('HoTen', 'DiaChi', 'SDT', 'GioiTinh', 'NgaySinh', 'Email', 'GioiThieu', 'TaiKhoan', 'avatar');
  return res[0];
}
const updateProfileLandlordModel = async (idUser, data, file) => {
  //console.log(file)
  if (file) {
    const res = await db('nguoidung').where('NguoiDungID', '=', idUser).update({
      HoTen: data.updateFullname,
      DiaChi: data.cities,
      SDT: data.updatePhone,
      GioiTinh: data.updateSex,
      GioiThieu: data.updateIntro,
      avatar: file
    })
  }
  else {
    const res = await db('nguoidung').where('NguoiDungID', '=', idUser).update({
      HoTen: data.updateFullname,
      DiaChi: data.cities,
      SDT: data.updatePhone,
      GioiTinh: data.updateSex,
      GioiThieu: data.updateIntro,
    })
  }

}

export {
  checkUserCredential,
  findUserById,
  addUser,
  getUserByEmail,
  getUserByUsername,
  getUserByPhone,
  checkPasswordValidity,
  getInfoProfileLandlord,
  getInfoProfileTenant,
  updateProfileLandlordModel,
  updateProfileTenantModel
}