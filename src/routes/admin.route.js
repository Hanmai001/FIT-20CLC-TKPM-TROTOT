import express from 'express';
import multer from 'multer';
// import appRoot from 'app-root-path';
import path from 'path';
import { getAllUsers, getDetailedUser, updateUser, countUserByRole, getNewUser, addUser, 
         checkUsername, getInfoProfile, updateProfile, updateUserPassword, getAllPosts,
         getPost, updatePost, getNewPost, addPost } 
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

router.route('/profile').get(getInfoProfile).post(updateProfile);
// router.route('/users/role').get(countUserByRole);
router.route('/users/new').get(getNewUser).post(addUser);
router.route('/users/is-available').get(checkUsername);
router.route('/users/:id/password').post(updateUserPassword);
router.route('/users/:id').get(getDetailedUser).post(updateUser);
router.get('/users', getAllUsers);
router.route('/posts/new').get(getNewPost).post(upload.array('upload-house-file', 10), addPost);
router.route('/posts/:id').get(getPost).post(upload.array('upload-house-file', 10), updatePost);
router.route('/posts').get(getAllPosts);
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