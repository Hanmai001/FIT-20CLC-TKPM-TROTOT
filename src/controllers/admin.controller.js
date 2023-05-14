import userModel from '../models/user.model';

const getDate = (date) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();
  
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
  
    return [year, month, day].join("/");
}

const getAllUsers = async (req, res, next) => {
    try {
        if (req.query.id && req.query.block) {
            const {id, block} = req.query;
            
            if (block === "true") await userModel.block(id);
            else await userModel.unblock(id);
            
            res.redirect('/admin/users');
        } else if (req.query.role) {
            const role = req.query.role;
            
            const users = await userModel.findByRole(role);
            res.render('vwAdmin/user', {
                users
            })
        } else {
            const users = await userModel.findAll();
            res.render('vwAdmin/user', {
                users
            })
        }
    } catch(err) {
        next(err);
    }
}

const getDetailedUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await userModel.findById(id);

        user.NgaySinh = getDate(user.NgaySinh);
        res.render('vwAdmin/update_user', {
            user
        })
    } catch(err) {
        next(err);
    }
}

const updateUser = async (req, res, next) => {
    try {   
        const user = req.body;
        user.id = req.params.id;
        console.log(user);

        await userModel.patch(user);

        res.redirect('/admin/users');
    } catch (err) {
        next(err);
    }
}

const countUserByRole = async (req, res, next) => {
    try { 
        return userModel.countByRole(req.query.role);
    } catch (err) {
        next(err);
    }
}

const getNewUser = async (req, res, next) => {
    try { 
        res.render('vwAdmin/add_user');
    } catch (err) {
        next(err);
    }
}

const addUser = async (req, res, next) => {
    try { 
        await userModel.add(req.body);

        res.redirect('back');
    } catch (err) {
        next(err);
    }
}

const checkUsername = async (req, res, next) => {
    try { 
        const list = await userModel.findUsername(req.query.username);

        if (list.length > 0) {
            return true; 
        }
        return false;
    } catch (err) {
        next(err);
    }
}

const getInfoProfile = async (req, res, next) => {
    try {
        const user = await userModel.findById("1");
        user.NgaySinh = getDate(user.NgaySinh);

        res.render('vwAdmin/profile', {user});
    } catch (err) {
        next(err);
    }
}

export { getAllUsers, getDetailedUser, updateUser, 
    countUserByRole, getNewUser, addUser, checkUsername,
    getInfoProfile}