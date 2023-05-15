import { addHouseModel, deleteLandlordHouseModel, getPostInfo, getAuthorInfo, getReviewInfo, getutilitiesInfo, getImageInfo, getAllPostInfo } from "../models/post.model";
import { addPhotoModel, deletePhotoModel, findPhotoOfHouse, deletePhotosByArrayModel } from "../models/photo.model";
import { addUtilityHouseModel, deleteUtilityModel, findUtilitiesOfHouse, findUtilityOfHouse, deleteOneUtilityModel } from "../models/utility.model";
import { addVideoModel, deleteVideoModel, findVideoOfHouse, deleteVideosByArrayModel } from "../models/video.model";

const addHouse = async (req, res) => {
    const { utilities } = req.body;
    const idUser = res.locals.user.id;
    const id = await addHouseModel(idUser, req.body);
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
    const post = await getAllPostInfo();
    //  const image = await getImageInfo(post.TinID);
   // console.log(post);
    res.render("vwPost/list-houses", { post });
}
const getDetailsPage = async (req, res) => {
    const postID = req.params.id;
    const post = await getPostInfo(postID);
    const author = await getAuthorInfo(postID);
    const review = await getReviewInfo(postID);
    const utilities = await getutilitiesInfo(postID);
    const image = await getImageInfo(postID);
    //  console.log(review);
    res.render("vwPost/details-house", { post, author, review, utilities, image });
};

export { addHouse, deleteLandlordHouse, updateHouse, getListPage, getDetailsPage }