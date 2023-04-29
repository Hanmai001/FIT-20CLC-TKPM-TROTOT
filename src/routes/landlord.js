import express from 'express';
const initLandlordRoute = express.Router();
import { getPostHousePage, getHouseManagementPage} from '../controllers/landlord.controller';
initLandlordRoute.route("/post-house").get(getPostHousePage);
initLandlordRoute.route("/house-management").get(getHouseManagementPage);

export default initLandlordRoute;