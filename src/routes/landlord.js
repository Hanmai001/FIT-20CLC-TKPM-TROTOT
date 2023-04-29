import express from 'express';
const initLandlordRoute = express.Router();
import { getPostHousePage, getHouseManagementPage, getManageAppointmentPage} from '../controllers/landlord.controller';
initLandlordRoute.route("/post-house").get(getPostHousePage);
initLandlordRoute.route("/house-management").get(getHouseManagementPage);
initLandlordRoute.route("/manage-appointment").get(getManageAppointmentPage);

export default initLandlordRoute;