import db from "../config/db.config";

const getUtilityListModel = async() => {
    const utilities = await db('tien_ich').select('*');
    return utilities;
}
const addUtilityHouseModel = async (idUtility, idHouse) => {
    await db('tienich_tindangtro').insert({ TienIchID: idUtility, TinID: idHouse });
}
const deleteUtilityModel = async (idHouse) => {
    await db('tienich_tindangtro').where('TinID', '=', idHouse).del();
}
export {getUtilityListModel, addUtilityHouseModel, deleteUtilityModel}