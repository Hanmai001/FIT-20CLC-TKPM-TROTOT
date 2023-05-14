import express from 'express';
const initDetailsRoute = express.Router();
import { getHousePage } from '../controllers/home.controller';

initDetailsRoute.route("/").get(getHousePage);

export default initDetailsRoute;