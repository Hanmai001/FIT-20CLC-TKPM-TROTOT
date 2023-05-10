import db from "../config/db.config";

const getTrendingHouseInfo = async (req, res) => {
    const result = await db.select().from('tindangtro')
    console.log(result);
    return res.render('vwLandLord/main_page', { result: result })
}

export { getTrendingHouseInfo }