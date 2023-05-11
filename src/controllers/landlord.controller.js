import { getAllHousesOfLandlord, getLandlordHouseListModel } from "../models/house.model";
import { findPhotosOfHouse } from "../models/photo.model";
import { getInfoProfile, updateProfileModel } from "../models/landlord.model";

const getPostHousePage = async (req, res) => {
    res.render("vwLandlord/post-house")
}
const getHouseManagementPage = async (req, res) => {
    let { page, filter } = req.query;
    if (!page) page = 1;
    const { houses, pages } = await getAllHousesOfLandlord(1, filter);
    console.log(filter, page)
    const result = await getLandlordHouseListModel(1, 5, (page - 1) * 5, filter);
    for (let house of result) {
        const temp = await findPhotosOfHouse(house.TinID);
        house.photo = temp[0].ChiTietHinhAnh;
        const date = new Date(house.NgayDang);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const vietnameseDate = date.toLocaleDateString('vi-VN', options);
        const vietnameseTime = date.toLocaleTimeString('vi-VN');
        house.NgayDang = vietnameseDate + ' ' + vietnameseTime;
        let str = house.Gia.toString();
        let result = '';
        while (str.length > 3) {
            result = '.' + str.slice(-3) + result;
            str = str.slice(0, -3);
        }
        result = str + result;
        house.Gia = result;
    }
    return res.render("vwLandlord/house-management", { page: page ? parseInt(page) : 1, pages: parseInt(pages), houses: result })
}
const getManageAppointmentPage = async (req, res) => {
    return res.render("vwLandlord/manage-appointment")
}
const getProfilePage = async (req, res) => {
    const idUser = 1;
    const user = await getInfoProfile(idUser);
    const date = new Date(user.NgaySinh);
    let time = date.toISOString().substring(0, 10);
    const newDate = new Date(time);
    newDate.setDate(newDate.getDate() + 1);
    const newDateStr = newDate.toISOString().slice(0, 10);
    user.NgaySinh = newDateStr;
    res.render("vwLandlord/landlord-profile", { idUser: 1, user })
}
const getChangePassPage = async (req, res) => {
    res.render("vwLandlord/change-password")
}
const updateProfile = async (req, res) => {
    const idUser = 1;
    let ava = '';
    console.log(req.body, req.file);
    if (req.file)
        ava = '../.' + req.file.destination + req.file.filename;
    await updateProfileModel(idUser, req.body, ava);
    res.redirect('/landlord/profile')
}
export { getPostHousePage, getHouseManagementPage, getManageAppointmentPage, getProfilePage, getChangePassPage, updateProfile }