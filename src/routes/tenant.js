import express from 'express';
const initTenantRoute = express.Router();
import { getManageAppointmentPage, getProfilePage, getChangePassPage, updateProfile, getTenantPage } from '../controllers/tenant.controller';
initTenantRoute.route("/manage-appointment").get(getManageAppointmentPage);
initTenantRoute.route("/profile").get(getProfilePage);
initTenantRoute.route("/change-password").get(getChangePassPage);
initTenantRoute.route("/profile/update/:id").post(updateProfile);
initTenantRoute.route("/").get(getTenantPage);

export default initTenantRoute;