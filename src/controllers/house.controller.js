import db from "../config/db.config";

const addHouse = async (req, res) => {
    console.log(req.files, req.body);
    const result = await db.query("select * from tin_nha_tro");
    console.log(result)
    return res.send("kuhjgjg")
}

export {addHouse}