import { addHouseModel, deleteLandlordHouseModel, getPostInfo, getAuthorInfo, getReviewInfo, getutilitiesInfo, getImageInfo, getAllPostInfo, performFullTextSearch } from "../models/post.model";
import { addPhotoModel, deletePhotoModel, findPhotoOfHouse, deletePhotosByArrayModel } from "../models/photo.model";
import { addUtilityHouseModel, deleteUtilityModel, findUtilitiesOfHouse, findUtilityOfHouse, deleteOneUtilityModel } from "../models/utility.model";
import { addVideoModel, deleteVideoModel, findVideoOfHouse, deleteVideosByArrayModel } from "../models/video.model";
import { checkFavouritePostModel } from "../models/favourite_list.model";

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
    //console.log(post);
    for (let house of post) {
        let date = new Date(house.NgayDatHen);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        let vietnameseDate = date.toLocaleDateString('vi-VN', options);
        let vietnameseTime = date.toLocaleTimeString('vi-VN');
        house.NgayDatHen = vietnameseDate + ' ' + vietnameseTime;
        date = new Date(house.NgayGap);
        vietnameseDate = date.toLocaleDateString('vi-VN', options);
        vietnameseTime = date.toLocaleTimeString('vi-VN');
        house.NgayGap = vietnameseDate + ' ' + vietnameseTime;
        let str = house.Gia.toString();
        let result = '';
        while (str.length > 3) {
            result = '.' + str.slice(-3) + result;
            str = str.slice(0, -3);
        }
        result = str + result;
        house.Gia = result;
        house.Hinhanh = house.Hinhanh.slice(3)
    }

    res.render("vwPost/list-houses", { post });
}
const getResultPage = async (req, res) => {
    const keyword = req.query.q;
    const results = await performFullTextSearch(keyword);
    // console.log(results)
    for (let house of results) {
        let date = new Date(house.NgayDatHen);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        let vietnameseDate = date.toLocaleDateString('vi-VN', options);
        let vietnameseTime = date.toLocaleTimeString('vi-VN');
        house.NgayDatHen = vietnameseDate + ' ' + vietnameseTime;
        date = new Date(house.NgayGap);
        vietnameseDate = date.toLocaleDateString('vi-VN', options);
        vietnameseTime = date.toLocaleTimeString('vi-VN');
        house.NgayGap = vietnameseDate + ' ' + vietnameseTime;
        let str = house.Gia.toString();
        let result = '';
        while (str.length > 3) {
            result = '.' + str.slice(-3) + result;
            str = str.slice(0, -3);
        }
        result = str + result;
        house.Gia = result;
    }
    res.render('vwPost/search-results', { results: results });
};


const getDetailsPage = async (req, res) => {
    const postID = req.params.id;
    let idUser, checkFavourite;
    if (res.locals.user) {
        idUser = res.locals.user.id;
        checkFavourite = await checkFavouritePostModel(postID, idUser);
    }
    console.log(postID)
    const post = await getPostInfo(postID);
    const author = await getAuthorInfo(postID);
    const review = await getReviewInfo(postID);
    const utilities = await getutilitiesInfo(postID);
    const image = await getImageInfo(postID);
    const relate = await getAllPostInfo();
    for (let house of relate) {
        let date = new Date(house.NgayDatHen);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        let vietnameseDate = date.toLocaleDateString('vi-VN', options);
        let vietnameseTime = date.toLocaleTimeString('vi-VN');
        house.NgayDatHen = vietnameseDate + ' ' + vietnameseTime;
        date = new Date(house.NgayGap);
        vietnameseDate = date.toLocaleDateString('vi-VN', options);
        vietnameseTime = date.toLocaleTimeString('vi-VN');
        house.NgayGap = vietnameseDate + ' ' + vietnameseTime;
        let str = house.Gia.toString();
        let result = '';
        while (str.length > 3) {
            result = '.' + str.slice(-3) + result;
            str = str.slice(0, -3);
        }
        result = str + result;
        house.Gia = result;
    }
    res.render("vwPost/details-house", { post, author, review, utilities, image, relate: relate, checkFavourite });
};



export { addHouse, deleteLandlordHouse, updateHouse, getListPage, getDetailsPage, getResultPage }