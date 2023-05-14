import { addHouseModel, deleteLandlordHouseModel } from "../models/post.model";
import { addPhotoModel, deletePhotoModel, findPhotoOfHouse, deletePhotosByArrayModel } from "../models/photo.model";
import { addUtilityHouseModel, deleteUtilityModel, findUtilitiesOfHouse, findUtilityOfHouse, deleteOneUtilityModel } from "../models/utility.model";
import { addVideoModel, deleteVideoModel, findVideoOfHouse, deleteVideosByArrayModel } from "../models/video.model";

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
const updateHouse = async (req, res) => {
    let { utilities, deletedPhotos, deletedVideos } = req.body;
    const id = req.params.id;
    for (let file of req.files) {
        if (file.mimetype.startsWith('video/')) {
            if (!await findVideoOfHouse('../.' + file.destination + file.filename))
                await addVideoModel(file.destination, file.filename, id);
        }
        else {
            if (!await findPhotoOfHouse('../.' + file.destination + file.filename))
                await addPhotoModel(file.destination, file.filename, id);
        }

    }
    if (deletedPhotos) {
        if (typeof deletedPhotos === 'string')
            deletedPhotos = [deletedPhotos]
        await deletePhotosByArrayModel(id, deletedPhotos);

    }
    if (deletedVideos) {
        if (typeof deletedVideos === 'string')
            deletedVideos = [deletedVideos]
        await deleteVideosByArrayModel(id, deletedVideos);
    }
    let deletedUtilities = [];
    let oldUtilities = await findUtilitiesOfHouse(id);
    oldUtilities = oldUtilities.map(item => {
        if (!utilities.includes('' + item.TienIchID))
            deletedUtilities.push(item.TienIchID);
        return '' + item.TienIchID;
    });
    for (let x of deletedUtilities) {
        await deleteOneUtilityModel(id, x);
    }
    for (let utility of utilities) {
        if (!await findUtilityOfHouse(id, parseInt(utility)))
            await addUtilityHouseModel(utility, id);
    }
    return res.redirect('/landlord/house-management');
}
const deleteLandlordHouse = async (req, res) => {
    const id = req.params.id;
    //console.log(id)
    await deleteLandlordHouseModel(id);
    await deletePhotoModel(id);
    await deleteVideoModel(id);
    await deleteUtilityModel(id);
    return res.redirect('/landlord/house-management');
}
const getListPage = async (req, res) => {
    res.render("vwHouse/list-houses")
}
const getHousePage = async (req, res) => {
    res.render("vwHouse/details-house")
}

export { addHouse, deleteLandlordHouse, updateHouse, getListPage, getHousePage }