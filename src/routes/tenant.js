import express from 'express';
const initTenantRoute = express.Router();
import { getManageAppointmentPage, getProfilePage, getChangePassPage, updateProfile, getTenantPage, deleteAppointment } from '../controllers/tenant.controller';
import multer from 'multer';
import appRoot from 'app-root-path';

//Middleware
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(appRoot)
        cb(null, "./public/assets/pictures/");
    },

    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

let upload = multer({ storage: storage });
initTenantRoute.route("/manage-appointment").get(getManageAppointmentPage);
initTenantRoute.route("/profile").get(getProfilePage);
initTenantRoute.route("/change-password").get(getChangePassPage);
initTenantRoute.route("/profile/update/:id").post(upload.single('update-ava'), updateProfile);
initTenantRoute.route("/cancel-appointment/:id").patch(deleteAppointment);
initTenantRoute.route("/").get(getTenantPage);

export default initTenantRoute;