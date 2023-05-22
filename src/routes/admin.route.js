import express from 'express';
import multer from 'multer';
// import appRoot from 'app-root-path';
import path from 'path';
import { getAllUsers, getDetailedUser, updateUser, countUserByRole, getNewUser, addUser, 
         checkUsername, getInfoProfile, updateProfile, updateUserPassword, getAllPosts,
         getPost, updatePost, getNewPost, addPost, getAllAppointments, getAppointment,
         updateAppointment, getNewApm, addNewApm, deleteApm, deleteUser, deletePost, 
         updatePassword, getAllReviews, updateVisibility, getAllReports, logout} 
from '../controllers/admin.controller';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      // console.log(appRoot)
      cb(null, "./public/assets/pictures/");
  },

  filename: function (req, file, cb) {
      console.log(file)
      if (!file.originalname.includes('upload-house-file'))
          cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
      else
          cb(null, file.originalname);
  }
});

let upload = multer({ storage: storage });

const router = express.Router();

router.route('/profile/password').post(updatePassword);
router.route('/profile').get(getInfoProfile).post(updateProfile);
// router.route('/users/role').get(countUserByRole);
router.route('/users/new').get(getNewUser).post(addUser);
router.route('/users/is-available').get(checkUsername);
router.route('/users/:id/password').post(updateUserPassword);
router.route('/users/:id/delete').get(deleteUser);
router.route('/users/:id').get(getDetailedUser).post(updateUser);
router.get('/users', getAllUsers);
router.route('/posts/new').get(getNewPost).post(upload.array('upload-house-file', 10), addPost);
router.route('/posts/:id/delete').get(deletePost);
router.route('/posts/:id').get(getPost).post(upload.array('upload-house-file', 10), updatePost);
router.route('/posts').get(getAllPosts);
router.route('/appointments/new').get(getNewApm).post(addNewApm);
router.route('/appointments/:id/delete').get(deleteApm);
router.route('/appointments/:id').get(getAppointment).post(updateAppointment);
router.route('/appointments').get(getAllAppointments);
router.route('/reviews/:id').get(updateVisibility);
router.route('/reviews').get(getAllReviews);
router.route('/reports').get(getAllReports);
router.route('/logout').get(logout);


export default router;