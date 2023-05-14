import db from "../config/db.config";

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