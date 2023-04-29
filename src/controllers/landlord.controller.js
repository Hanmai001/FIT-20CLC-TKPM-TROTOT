const getPostHousePage = async (req, res) => {
    res.render("vwLandlord/post-house")
}
const getHouseManagementPage = async (req, res) => {
    return res.render("vwLandlord/house-management")
}
const getManageAppointmentPage = async (req, res) => {
    return res.render("vwLandlord/manage-appointment")
}

export {getPostHousePage, getHouseManagementPage, getManageAppointmentPage}