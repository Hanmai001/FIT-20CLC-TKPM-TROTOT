import express from 'express';
const initLandlordRoute = express.Router();
import { getPostHousePage, getHouseManagementPage, getManageAppointmentPage, getOwnerPage, getProfilePage, getChangePassPage } from '../controllers/landlord.controller';
initLandlordRoute.route("/post-house").get(getPostHousePage);
initLandlordRoute.route("/house-management").get(getHouseManagementPage);
initLandlordRoute.route("/manage-appointment").get(getManageAppointmentPage);
initLandlordRoute.route("/profile").get(getProfilePage);
initLandlordRoute.route("/change-password").get(getChangePassPage);
initLandlordRoute.route("/").get(getOwnerPage);

export default initLandlordRoute;