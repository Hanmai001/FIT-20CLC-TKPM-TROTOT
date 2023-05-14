import { addFavouritePostModel, deleteFavouritePostModel } from "../models/favourite_list.model";

const addFavouritePost = async (req, res) => {
    const { idPost } = req.body;
    const idUser = res.locals.user.id;
    await addFavouritePostModel(idPost, idUser);
    res.redirect('/');
}
const deleteFavouritePost = async (req, res) => {
    const idPost = req.params.id;
    const idUser = res.locals.user.id;
    await deleteFavouritePostModel(idPost, idUser);
    res.redirect('/');
}

export { addFavouritePost, deleteFavouritePost }