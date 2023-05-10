import { getAllHousesOfLandlord, getLandlordHouseListModel } from "../models/house.model";
const getPostHousePage = async (req, res) => {
    res.render("vwLandlord/post-house")
}
const getHouseManagementPage = async (req, res) => {
    let {page} = req.query;
    if (!page) page = 1;
    const {houses, pages} = await getAllHousesOfLandlord(1);
    console.log(pages, page)
    const result = await getLandlordHouseListModel(1, 5, page - 1);
    return res.render("vwLandlord/house-management", { page: page ? parseInt(page) : 1, pages: parseInt(pages), houses: result})
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