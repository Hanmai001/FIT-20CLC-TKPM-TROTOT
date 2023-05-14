import express from 'express';
import multer from 'multer';
import appRoot from 'app-root-path';
import path from 'path';
import {
    getPostHousePage,
    getHouseManagementPage,
    getManageAppointmentPage,
    getProfilePage,
    getChangePassPage,
    updateProfile,
    confirmAppointment,
    deleteAppointment,
    getEditHousePage,
} from '../controllers/landlord.controller';
import { logout } from '../controllers/auth.controller'

const initLandlordRoute = express.Router();
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
initLandlordRoute.route("/post-house").get(getPostHousePage);
initLandlordRoute.route("/house-management").get(getHouseManagementPage);
initLandlordRoute.route("/manage-appointment").get(getManageAppointmentPage);
initLandlordRoute.route("/profile").get(getProfilePage);
initLandlordRoute.route("/change-password").get(getChangePassPage);
initLandlordRoute.route("/edit-house/:id").get(getEditHousePage);
initLandlordRoute.route("/profile/update/:id").post(upload.single('update-ava'), updateProfile);
initLandlordRoute.route("/confirm-appointment/:id").patch(confirmAppointment);
initLandlordRoute.route("/cancel-appointment/:id").patch(deleteAppointment);
initLandlordRoute.route("/logout").get(logout);

export default initLandlordRoute;