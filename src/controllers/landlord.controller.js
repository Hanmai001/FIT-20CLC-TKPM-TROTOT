const getPostHousePage = async (req, res) => {
    return res.render("vwLandlord/post-house", { layout: false })
}
const getHouseManagementPage = async (req, res) => {
    return res.render("vwLandlord/house-management", { layout: false })
}
const getManageAppointmentPage = async (req, res) => {
    return res.render("vwLandlord/manage-appointment", { layout: false })
}

export {getPostHousePage, getHouseManagementPage, getManageAppointmentPage}