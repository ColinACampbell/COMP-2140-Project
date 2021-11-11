exports.getAssets = (req, res) => {
    console.log(res.user_session)
    res.status(200).json({
        assets :[]
    })
}