import express from 'express';
import { getAllUsers, getDetailedUser, updateUser, countUserByRole, getNewUser, addUser, 
         checkUsername, getInfoProfile, updateProfile, updateUserPassword, getAllPosts,
         getPost, updatePost } 
from '../controllers/admin.controller';

const router = express.Router();

router.route('/profile').get(getInfoProfile).post(updateProfile);
// router.route('/users/role').get(countUserByRole);
router.route('/users/new').get(getNewUser).post(addUser);
router.route('/users/is-available').get(checkUsername);
router.route('/users/:id/password').post(updateUserPassword);
router.route('/users/:id').get(getDetailedUser).post(updateUser);
router.get('/users', getAllUsers);
router.route('/posts').get(getPost).post(updatePost);
router.get('/posts', getAllPosts);
router.get('/appointment', (req, res, next) => {
  try {
    res.render('vwAdmin/appointment');
  } catch (err) { next(err) }
});
router.get('/review', (req, res, next) => {
  try {
    res.render('vwAdmin/review');
  } catch (err) { next(err) }

});


export default router;