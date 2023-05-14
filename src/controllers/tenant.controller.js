const getManageAppointmentPage = async (req, res) => {
    return res.render("vwTenant/manage-appointment")
}
const getProfilePage = async (req, res) => {
    res.render("vwTenant/tenant-profile")
}
const getChangePassPage = async (req, res) => {
    res.render("vwTenant/change-password")
}
const updateProfile = async (req, res) => {
    console.log(req.body);
}
export { getManageAppointmentPage, getProfilePage, getChangePassPage, updateProfile }