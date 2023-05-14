import express from 'express';
const initListRoute = express.Router();
import { getListPage } from '../controllers/home.controller';

initListRoute.route("/").get(getListPage);

export default initListRoute;