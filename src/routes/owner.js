import express from 'express';
const initOwnerRoute = express.Router();
import { getOwnerPage } from '../controllers/owner.controller';

initOwnerRoute.route("/").get(getOwnerPage)


export default initOwnerRoute;