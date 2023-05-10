import { addHouseModel, deleteLandlordHouseModel } from "../models/house.model";
import { addPhotoModel } from "../models/photo.model";
import { addUtilityHouseModel } from "../models/utility.model";
import { addVideoModel } from "../models/video.model";

const addHouse = async (req, res) => {
    const { utilities } = req.body;
    const id = await addHouseModel(req.body);
    for (let file of req.files) {
        if (file.mimetype.startsWith('video/')) {
            await addVideoModel(file.destination, file.filename, id);
        }
        else {
            await addPhotoModel(file.destination, file.filename, id);
        }

    }
    for (let utility of utilities) {
        await addUtilityHouseModel(utility, id);
    }
    return res.redirect('/landlord/house-management');
}
const deleteLandlordHouse = async (req, res) => {
    const id = req.params.id;
    console.log(id)
    await deleteLandlordHouseModel(id);
    return res.redirect('/landlord/house-management');
}

export { addHouse, deleteLandlordHouse }