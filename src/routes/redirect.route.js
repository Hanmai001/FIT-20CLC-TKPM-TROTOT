import express from 'express';
const router = express.Router();

router.get('/', (req, res, next) => {
    try {
       // console.log(res.locals)
        if (req.session.passport.user.LoaiNguoiDung == 'Người chủ trọ') {
            return res.redirect('/landlord');
        } else if (req.session.passport.user.LoaiNguoiDung == 'Admin') {
            return res.redirect('/admin/profile');
        } else if (req.session.passport.user.LoaiNguoiDung == 'Người thuê trọ') {
            return res.redirect('/guest');
        } else {
            return res.redirect('/');
        }
    } catch (err) {
        next(err);
    }
});
export default router;