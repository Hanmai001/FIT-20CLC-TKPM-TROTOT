import db from '../config/db.config';

const addFavouritePostModel = async (idPost, idUser) => {
    await db('tindangtro_nguoithuetro').insert({
        TinID: idPost,
        NguoiDungID: idUser
    })
}
const checkFavouritePostModel = async (idPost, idUser) => {
    const res = await db('tindangtro_nguoithuetro').where('TinID', '=', idPost).andWhere('NguoiDungID', '=', idUser).select("*");
    return res.length > 0;
}
const deleteFavouritePostModel = async (idPost, idUser) => {
    await db('tindangtro_nguoithuetro').where('TinID', '=', idPost).andWhere('NguoiDungID', '=', idUser).del();
}
const getFavouriteListOfTenant = async (idUser, filter) => {
    const result = await db('tindangtro_nguoithuetro').where('NguoiDungID', '=', idUser).select('*');
    return { houses: result, pages: Math.ceil(result.length / 5) };
}
const getFavouriteListPageModel = async (idUser, limit, offset, filter) => {
    const result = await db('tindangtro_nguoithuetro')
        .join('tindangtro', 'tindangtro_nguoithuetro.TinID', '=', 'tindangtro.TinID')
        .where('NguoiDungID', '=', idUser)
        .select('*')
        .limit(limit)
        .offset(offset);
    return result;
}

export { addFavouritePostModel, deleteFavouritePostModel, getFavouriteListOfTenant, getFavouriteListPageModel, checkFavouritePostModel }