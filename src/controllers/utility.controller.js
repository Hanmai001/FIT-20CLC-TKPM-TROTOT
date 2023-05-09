import { getUtilityListModel } from "../models/utility.model";

const getUtilityList = async (req, res) => {
    const utilities = await getUtilityListModel();
    res.status(200).json(utilities);
}

export { getUtilityList };