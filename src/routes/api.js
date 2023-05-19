import express from "express";
import { getUtilityList } from "../controllers/utility.controller";
import { getAllUsersID } from "../controllers/admin.controller";


const apiRoute = express.Router();
apiRoute.route('/utilities').get(getUtilityList);
apiRoute.route('/users').get(getAllUsersID);

export default apiRoute;
