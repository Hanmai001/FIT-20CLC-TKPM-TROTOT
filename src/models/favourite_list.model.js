import db from '../config/db.config';

const addFavouritePostModel = async (idPost, idUser) => {
    await db('tindangtro_nguoithuetro').insert({
        TinID: idPost,
        NguoiDungID: idUser
    })
}

const deleteFavouritePostModel = async (idPost, idUser) => {
    await db('tindangtro_nguoithuetro').where('TinID', '=', idPost).andWhere('NguoiDungID', '=', idUser).del();
}

export {addFavouritePostModel, deleteFavouritePostModel}