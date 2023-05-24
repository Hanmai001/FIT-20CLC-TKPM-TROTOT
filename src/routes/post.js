import express from 'express';
import multer from 'multer';
// import appRoot from 'app-root-path';
import path from 'path';
const initHouseRoute = express.Router();
import { addHouse, deleteLandlordHouse, updateHouse, getDetailsPage, getListPage, getResultPage, postReview } from '../controllers/post.controller';
//Middleware
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // console.log(appRoot)
        cb(null, "./public/assets/pictures/");
    },

    filename: function (req, file, cb) {
        console.log(file)
        if (!file.originalname.includes('upload-house-file'))
            cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
        else
            cb(null, file.originalname);
    }
});

let upload = multer({ storage: storage });
initHouseRoute.route("/add-house").post(upload.array('upload-house-file', 10), addHouse);
initHouseRoute.route("/delete-house/:id").delete(deleteLandlordHouse);
initHouseRoute.route("/update-house/:id").post(upload.array('upload-house-file', 10), updateHouse);
initHouseRoute.route("/details/:id").get(getDetailsPage);
initHouseRoute.route("/search-results").get(getResultPage);
initHouseRoute.route("/list").get(getListPage);
initHouseRoute.route("/submit-review/:id").post(postReview);


export default initHouseRoute;