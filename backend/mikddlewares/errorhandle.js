function handleError(err, req, resp, next) {
    try {
        if (resp.statusCode === 200) resp.status = 500
        resp.json({ error: err.message||"something went wrong" })

    } catch (error) {
        next()
    }
}
module.exports = { handleError }