import express from 'express';
import { getAllUsers } from '../controllers/admin.controller';
import { isLoggedAdmin } from '../controllers/auth.controller';
const router = express.Router();

router.get('/profile', isLoggedAdmin, (req, res, next) => {
  try {
    res.render('vwAdmin/profile');
  } catch (err) { next(err) }

});

router.get('/users', isLoggedAdmin, getAllUsers);

router.get('/post', isLoggedAdmin, (req, res, next) => {
  try {
    res.render('vwAdmin/post');
  } catch (err) { next(err) }

});

router.get('/appointment', isLoggedAdmin, (req, res, next) => {
  try {
    res.render('vwAdmin/appointment');
  } catch (err) { next(err) }

});

router.get('/review', isLoggedAdmin, (req, res, next) => {
  try {
    res.render('vwAdmin/review');
  } catch (err) { next(err) }

});


export default router;