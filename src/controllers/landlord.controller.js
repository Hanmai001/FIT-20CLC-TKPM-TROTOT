const getPostHousePage = async (req, res) => {
    res.render("vwLandlord/post-house")
}
const getHouseManagementPage = async (req, res) => {
    return res.render("vwLandlord/house-management")
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