import express from "express";
import { getUtilityList} from "../controllers/utility.controller";
const initUtilityRoute = express.Router();
initUtilityRoute.route('/utilities').get(getUtilityList);

export default initUtilityRoute;