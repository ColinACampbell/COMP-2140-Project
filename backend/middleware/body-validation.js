

module.exports = (req, res, next) => {
    const body = req.body;
    let passedCheck = true;
    for (var key in body) {

        if (typeof body[key] === 'string' || body[key] instanceof String)
        {

        }

        if (body[key] === null || body[key] === "" || body[key] === undefined)
            passedCheck = false;
    }

    if (passedCheck) 
        next() // move on to the next layer
    else 
        res.status(400).json({
            message : "Invalid body"
        })
}