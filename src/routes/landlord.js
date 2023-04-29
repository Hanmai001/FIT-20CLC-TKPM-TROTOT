import express from 'express';
const initLandlordRoute = express.Router();
import { getPostHousePage} from '../controllers/landlord.controller';
initLandlordRoute.route("/post-house").get(getPostHousePage);

export default initLandlordRoute;