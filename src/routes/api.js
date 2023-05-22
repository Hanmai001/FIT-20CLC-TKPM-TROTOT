import express from "express";
import { getUtilityList } from "../controllers/utility.controller";
import { getAllUsersID, getAllPostsID } from "../controllers/admin.controller";


const apiRoute = express.Router();
apiRoute.route('/utilities').get(getUtilityList);
apiRoute.route('/users').get(getAllUsersID);
apiRoute.route('/posts').get(getAllPostsID);

export default apiRoute;
