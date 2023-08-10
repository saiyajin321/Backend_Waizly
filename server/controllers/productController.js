const { Product, Category, User, Log } = require('../models')

class productController {
    static async showProducts(req, res, next) {
        try {
            const products = await Product.findAll({
                include: [
                    { model: Category },
                    { model: User, attributes: { exclude: ['password', 'email'] } }
                ]
            })
            res.status(201).json(products)
        } catch (err) {
            console.log(err);
            next(err)
        }
    }

    static async showProductById(req, res, next){
        try {
            const {id} = req.params
            const product = await Product.findByPk(id,{
                include: [
                    { model: Category },
                    { model: User, attributes: { exclude: ['password', 'email'] } }
                ]
            })
            res.status(201).json(product)
        } catch (err) {
            console.log(err);
            next(err)
        }
    }

    static async addProducts(req, res, next) {
        try {
            const { name, CategoryId, color, size, price, description } = req.body
            let myId = req.user.id
            let username = req.user.username
            await Product.create({ name, CategoryId, color, size, price, description, UserId: myId })
            await Log.create({ name, description: `${name} added to products`, updatedBy: username })
            res.status(201).json({ message: "Product created" })
        } catch (err) {
            next(err)
        }
    }

    static async deleteProducts(req, res, next){
        try {
            const { id } = req.params
            const username = req.user.username
            const product = await Product.findOne({where : {id}})
            if(!product){
                throw { name : "noProductFound"}
            }
            await product.destroy()
            await Log.create({name : product.name, description : `${product.name} deleted from products`, updatedBy : username })
            res.status(201).json({ message : `${product.name} deleted`})
        } catch (err) {
            next(err)
        }
    }

    static async updateProduct(req, res, next){
        try {
            const { id } = req.params
            const product = await Product.findByPk(id,{
                include: [
                    { model: Category },
                    { model: User, attributes: { exclude: ['password', 'email'] } }
                ]
            })
            if(!product){
                throw { name : "noProductFound"}
            }
            const { name, CategoryId, color, size, price, description } = req. body
            let myId = req.user.id
            let username = req.user.username

            await Product.update({ name, CategoryId, color, size, price, description, UserId: myId }, {where : {id}})
            await Log.create({name, description : `${name} updated`, updatedBy : username})
            res.status(201).json({message : `Product ${name} updated`})
        } catch (err) {
            console.log(err);
            next(err)
        }
    }
}


module.exports = productController