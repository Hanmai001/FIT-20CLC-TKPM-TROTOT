import express from 'express';
import multer from 'multer';
import appRoot from 'app-root-path';
import path from 'path';
const initHouseRoute = express.Router();
import {addHouse, deleteLandlordHouse} from '../controllers/house.controller';
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

let upload = multer({ storage: storage});
initHouseRoute.route("/add-house").post(upload.array('upload-house-file', 10), addHouse);
initHouseRoute.route("/delete-house/:id").delete(deleteLandlordHouse);

export default initHouseRoute;