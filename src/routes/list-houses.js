import express from 'express';
const initListRoute = express.Router();
import { getListPage } from '../controllers/list.controller';

initListRoute.route("/").get(getListPage);

export default initListRoute;