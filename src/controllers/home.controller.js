

const getListPage = async (req, res) => {
    res.render("vwHouse/list-houses")
}
const getHousePage = async (req, res) => {
    res.render("vwHouse/details-house")
}

export { getListPage, getHousePage }