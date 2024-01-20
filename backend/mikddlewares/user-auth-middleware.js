const jwt = require("jsonwebtoken")


function userAuthMiddleware(req, resp, next) {
    try {
        
        let B_token = req.headers.authorization.split(' ')[1]
        
        const payload = jwt.verify(B_token, process.env.JWT_KEY)
        req.session = {
            userdata: payload
        }
        next();
    } catch (error) {
        resp.status(401)
        return resp.json({ err: "invalid please login" })
    }
}
// ---------------------------------------------------------------------------------------->>>>>>
function adminAuthMiddleware(req, resp, next) {
    try {
        let B_token = req.headers.authorization.split(' ')[1]
        const payload = jwt.verify(B_token, process.env.JWT_KEY)
        req.session = {
            userdata: payload
        }
         console.log(payload)
        if (payload.isAdmin) {
            return next()
        }
        resp.status(401)
        return resp.json({ err: "not an admin......you don't have right" })
    } catch (error) {
        resp.status(401)
        return resp.json({ err: "invalid token" })
    }
}
// ---------------------------------------------------------------------------------------------


module.exports = { userAuthMiddleware, adminAuthMiddleware }