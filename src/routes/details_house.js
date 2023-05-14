import express from 'express';
const initDetailsRoute = express.Router();
import { getHousePage } from '../controllers/house.controller';

initDetailsRoute.route("/").get(getHousePage);

export default initDetailsRoute;