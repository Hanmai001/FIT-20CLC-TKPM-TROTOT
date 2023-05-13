import express from 'express';
const router = express.Router();

router.get('/', (req, res, next) => {
    try {
        console.log(req.session.passport.user.LoaiNguoiDung)
        if (req.session.passport.user.LoaiNguoiDung == 'Người chủ trọ') {
            return res.redirect('/landlord');
        } else if (req.session.passport.user.LoaiNguoiDung == 'Admin') {
            return res.redirect('/admin/profile');
        } else {
            return res.redirect('/');
        }
    } catch (err) {
        next(err);
    }
});
export default router;