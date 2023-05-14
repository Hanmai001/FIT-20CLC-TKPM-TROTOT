import express from 'express';
import { addFavouritePost, deleteFavouritePost } from '../controllers/favourite_list.controller';
const initFavouriteListRoute = express.Router();

initFavouriteListRoute.route('/add-favourite').post(addFavouritePost);
initFavouriteListRoute.route('/delete-favourite/:id').delete(deleteFavouritePost);

export default initFavouriteListRoute;
