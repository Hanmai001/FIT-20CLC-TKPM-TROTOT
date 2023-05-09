import db from "../config/db.config";

const getUtilityListModel = async() => {
    const utilities = await db('tien_ich').select('*');
    return utilities;
}
const addUtilityHouseModel = async (idUtility, idHouse) => {
    await db('tienich_tindangtro').insert({ TienIchID: idUtility, TinID: idHouse });
}
export {getUtilityListModel, addUtilityHouseModel}