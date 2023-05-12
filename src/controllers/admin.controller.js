import userModel from '../models/user.model';

const getAllUsers = async (req, res, next) => {
    try {
        const users = await userModel.findAll();
        console.log(users);
        res.render('vwAdmin/user', {
            users
        })
    } catch(err) {
        next(err);
    }
}

export { getAllUsers }