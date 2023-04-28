import express from 'express';
const initHouseRoute = express.Router();
import {getPostHousePage} from '../controllers/house.controller';

initHouseRoute.route("/post-house").get(getPostHousePage);

export default initHouseRoute;