import express from 'express';
const initAppointmentRoute = express.Router();
import { deleteAppointment } from '../controllers/appointment.controller';
initAppointmentRoute.route('/cancel-appointment').delete(deleteAppointment);

export default initAppointmentRoute;