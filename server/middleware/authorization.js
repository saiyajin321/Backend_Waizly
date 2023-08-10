const {Product} = require('../models')


const authorization = async(req, res, next) =>{
    try {
        if(req.user.role !== "admin"){
            throw { name : "notAdmin"}
        }
        next()
    } catch (err) {
        next(err)
    }
}

module.exports = authorization