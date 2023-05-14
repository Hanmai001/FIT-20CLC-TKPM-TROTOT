import express from 'express';
const router = express.Router();

router.get('/', (req, res, next) => {
    res.render("vwGuest/guest-page");
});
export default router;