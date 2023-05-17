import express from 'express';
const initTenantRoute = express.Router();

import {
    getManageAppointmentPage,
    getChangePassPage,
    updateProfile,
    getProfilePage,
    deleteAppointment,
    addAppointment,
    getFavouriteListPage,
    addReport,
    deleteFavouritePost,
    addFavouritePost,
    checkCurrentPassword,
    updatePassword

} from '../controllers/tenant.controller';
import { logout } from '../controllers/auth.controller';
import multer from 'multer';
import appRoot from 'app-root-path';
import path from 'path';

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
initTenantRoute.route("/favourite-list").get(getFavouriteListPage);
initTenantRoute.route("/change-password").get(getChangePassPage);
initTenantRoute.route("/profile/update/:id").post(upload.single('update-ava'), updateProfile);
initTenantRoute.route("/cancel-appointment/:id").patch(deleteAppointment);
initTenantRoute.route("/add-appointment/:id").post(addAppointment);
initTenantRoute.route('/add-favourite').post(addFavouritePost);
initTenantRoute.route('/add-report/:id').post(addReport);
initTenantRoute.route('/delete-favourite/:id').delete(deleteFavouritePost);
initTenantRoute.route('/check-current-password').post(checkCurrentPassword);
initTenantRoute.route('/update-password').post(updatePassword);
initTenantRoute.route("/logout").get(logout);

export default initTenantRoute;