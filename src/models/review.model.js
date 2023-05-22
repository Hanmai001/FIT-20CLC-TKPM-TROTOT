import db from "../config/db.config";

export default {
    async findAll() {
        return await db('danhgia').select('*');
    },

     block(id) {
        return db('danhgia').where('DanhGiaID', id).update({TrangThai: 'Bị ẩn'});
    },

     unblock(id) {
        return db('danhgia').where('DanhGiaID', id).update({TrangThai: 'Hiển thị'});
    }
}