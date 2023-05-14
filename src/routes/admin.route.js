import express from 'express';
import { getAllUsers, getDetailedUser, updateUser, countUserByRole, getNewUser, addUser, checkUsername} from '../controllers/admin.controller';

const router = express.Router();

router.get('/profile', (req, res, next) => {
  try {
    res.render('vwAdmin/profile');
  } catch(err) { next(err) }

});
// router.route('/users/role').get(countUserByRole);
router.route('/users/new').get(getNewUser).post(addUser);
router.route('/users/is-available').get(checkUsername);
router.route('/users/:id').get(getDetailedUser).post(updateUser);
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