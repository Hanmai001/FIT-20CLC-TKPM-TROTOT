import express from 'express';
const initTenantRoute = express.Router();
import { getManageAppointmentPage, getProfilePage, getChangePassPage } from '../controllers/tenant.controller';
initTenantRoute.route("/manage-appointment").get(getManageAppointmentPage);
initTenantRoute.route("/profile").get(getProfilePage);
initTenantRoute.route("/change-password").get(getChangePassPage);

export default initTenantRoute;