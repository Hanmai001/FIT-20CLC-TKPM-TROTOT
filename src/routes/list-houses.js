import express from 'express';
const initListRoute = express.Router();
import { getListPage } from '../controllers/house.controller';

initListRoute.route("/").get(getListPage);

export default initListRoute;