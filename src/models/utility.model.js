import db from "../config/db.config";

const getUtilityListModel = async () => {
    const utilities = await db('tien_ich').select('*');
    return utilities;
}
const addUtilityHouseModel = async (idUtility, idHouse) => {
    await db('tienich_tindangtro').insert({ TienIchID: idUtility, TinID: idHouse });
}
const deleteUtilityModel = async (idHouse) => {
    await db('tienich_tindangtro').where('TinID', '=', idHouse).del();
}
const deleteOneUtilityModel = async (idHouse, idUtility) => {
    await db('tienich_tindangtro').where('TinID', '=', idHouse).andWhere('TienIchID', '=', idUtility).del();
}
const findUtilitiesOfHouse = async (idHouse) => {
    const res = await db('tienich_tindangtro')
        .where('TinID', '=', idHouse).select('TienIchID');
    return res;
}
const findUtilityOfHouse = async (idHouse, idUtility) => {
    const res = await db('tienich_tindangtro')
        .where('TinID', '=', idHouse).andWhere('TienIchID', '=', idUtility).select('TienIchID');
    return res.length > 0;
}
export {
    getUtilityListModel,
    addUtilityHouseModel,
    deleteUtilityModel,
    findUtilitiesOfHouse,
    findUtilityOfHouse,
    deleteOneUtilityModel
}