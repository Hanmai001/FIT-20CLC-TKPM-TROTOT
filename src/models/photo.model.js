import db from "../config/db.config";

const addPhotoModel = async (des, name, idHouse) => {
    const [idPhoto] = await db('hinh_anh').insert(
        {
            ChiTietHinhAnh: '../.' + des + name
        }, 'HinhAnhID').returning('HinhAnhID');
    await addPhoTo_House(idPhoto, idHouse)

}
const addPhoTo_House = async (idPhoto, idHouse) => {
    await db('hinhanh_tindangtro').insert({HinhAnhID: idPhoto, TinID: idHouse});
}

export { addPhotoModel }