const getPostHousePage = async (req, res) => {
    return res.render("layouts/post-house", { layout: false })
}
const addHouse = async (req, res) => {
    console.log(req.files, req.body);
    return res.send("kuhjgjg")
}
let handleUploadMultipleFile = async (req, res) => {

    if (req.fileValidationError) {

        return res.send(req.fileValidationError);
    }
    else if (!req.files) {
        return res.send('Please select an image to upload');
    }
    // else if (err instanceof multer.MulterError) {

    //     return res.send(err);
    // }

    let result = "You have uploaded these images: <hr />";
    const files = req.files;
    let index, len;

    // Loop through all the uploaded images and display them on frontend
    for (index = 0, len = files.length; index < len; ++index) {
        result += `<img src="/image/${files[index].filename}" width="300" style="margin-right: 20px;">`;
    }
    result += '<hr/><a href="/upload">Upload more images</a>';
    res.send(result);

}

export {getPostHousePage, addHouse}