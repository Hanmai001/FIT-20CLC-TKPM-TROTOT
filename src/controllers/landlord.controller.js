import { getAllHousesOfLandlord, getLandlordHouseListModel } from "../models/house.model";
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
    res.render("vwLandlord/landlord-profile")
}
const getChangePassPage = async (req, res) => {
    res.render("vwLandlord/change-password")
}
export { getPostHousePage, getHouseManagementPage, getManageAppointmentPage, getProfilePage, getChangePassPage }