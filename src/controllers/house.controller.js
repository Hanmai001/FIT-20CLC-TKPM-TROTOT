const getPostHousePage = async (req, res) => {
    return res.render("layouts/post-house", { layout: false })
}

export {getPostHousePage}