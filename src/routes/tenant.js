import express from 'express';
const initTenantRoute = express.Router();
import { getManageAppointmentPage, getProfilePage, getChangePassPage, updateProfile, getTenantPage } from '../controllers/tenant.controller';
import { logout } from '../controllers/auth.controller'
initTenantRoute.route("/manage-appointment").get(getManageAppointmentPage);
initTenantRoute.route("/profile").get(getProfilePage);
initTenantRoute.route("/change-password").get(getChangePassPage);
initTenantRoute.route("/profile/update/:id").post(updateProfile);
initTenantRoute.route("/logout").get(logout);
initTenantRoute.route("/").get(getTenantPage);

export default initTenantRoute;