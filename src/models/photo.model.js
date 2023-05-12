import db from "../config/db.config";

const addPhotoModel = async (des, name, idHouse) => {
    const [idPhoto] = await db('hinh_anh').insert(
        {
            ChiTietHinhAnh: '../.' + des + name
        }, 'HinhAnhID').returning('HinhAnhID');
    await addPhoTo_House(idPhoto, idHouse)

}
const addPhoTo_House = async (idPhoto, idHouse) => {
    await db('hinhanh_tindangtro').insert({ HinhAnhID: idPhoto, TinID: idHouse });
}
const findPhotosOfHouse = async (idHouse) => {
    const res = await db('hinhanh_tindangtro')
        .join('hinh_anh', 'hinh_anh.HinhAnhID', '=', 'hinhanh_tindangtro.HinhAnhID')
        .where('TinID', '=', idHouse).select('hinhanh_tindangtro.HinhAnhID', 'ChiTietHinhAnh');
    return res;

}
const deletePhotoModel = async (idHouse) => {
    const res = await findPhotosOfHouse(idHouse);
    const ids = res.map(item => item.HinhAnhID);
    //console.log(res);
    await db('hinh_anh').whereIn('HinhAnhID', ids).delete();
    await db('hinhanh_tindangtro').where('TinID', '=', idHouse).del();
}

export { addPhotoModel, deletePhotoModel, findPhotosOfHouse }