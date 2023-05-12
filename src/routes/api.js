import express from "express";
import { getUtilityList } from "../controllers/utility.controller";
const apiRoute = express.Router();
apiRoute.route('/utilities').get(getUtilityList);

export default apiRoute;