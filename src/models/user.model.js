import db from "../config/db.config";

export default {
  findAll() {
    return db('nguoidung');
  },

  async findById(id) {
    const list = await db('nguoidung').where('id', id);
    if (list.length === 0)
      return null;

    return list[0];
  },

  add(user) {
    return db('nguoidung').insert(user);
  },

  del(id) {
    return db('nguoidung').where('id', id).del();
  },

  patch(user) {
    const id = user.id;
    delete user.id;

    return db('nguoidung').where('id', id).update(user);
  }
}