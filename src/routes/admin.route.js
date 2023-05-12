import express from 'express';
import { getAllUsers } from '../controllers/admin.controller';

const router = express.Router();

router.get('/profile', (req, res, next) => {
  try {
    res.render('vwAdmin/profile');
  } catch(err) { next(err) }

});

router.get('/users', getAllUsers);

router.get('/post', (req, res, next) => {
  try {
    res.render('vwAdmin/post');
  } catch(err) { next(err) }

});

router.get('/appointment', (req, res, next) => {
  try {
    res.render('vwAdmin/appointment');
  } catch(err) { next(err) }

});

router.get('/review', (req, res, next) => {
  try {
    res.render('vwAdmin/review');
  } catch(err) { next(err) }

});


export default router;