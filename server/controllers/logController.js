const { Log } = require('../models')

class logController{
    static async showLog(req, res, next){
        try {
            const logs = await Log.findAll()
            res.send(logs)
        } catch (err) {
            next(err)
        }
    }
}

module.exports = logController