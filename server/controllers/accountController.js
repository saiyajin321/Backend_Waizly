const { comparePassword } = require('../helper/bcrypt')
const { signToken } = require('../helper/jwt')
const { User } = require('../models')

class UserController{
    static async login(req, res, next){
        try {
            const { email, password } = req.body
            if(!email  || !password){
                throw { name : "EmptyBody"}
            }
            const user = await User.findOne( { where : { email}})
            if(!user){
                throw { name : "noUser"}
            }
            const isValidPassword = comparePassword(password, user.password)
            if(!isValidPassword){
                throw { name : "invalidUser"}
            }
            const access_token = signToken({
                id : user.id,
                email : user.email,
                role : user.role
            })
            const username = user.username
            const role = user.role
            res.status(200).json({ access_token, username, role})
        } catch (err) {
            next(err)
        }
    }
}

module.exports = UserController