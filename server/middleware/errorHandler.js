const errorHandler = async (err, req, res, next) => {
    if (err.name === "EmptyBody") {
        res.status(400).json({ message: "Field cannot be empty" })
    } else if (err.name === "noUser" || err.name === "JsonWebTokenError") {
        res.status(401).json({ message: "No User Found" })
    } else if (err.name === "invalidUser") {
        res.status(401).json({ message: "Invalid email/password" })
    }
    else if (
        err.name === "SequelizeUniqueConstraintError" ||
        err.name === "SequelizeValidationError"
    ) {
        res.status(400).json({ message: `${err.errors[0].message}` });
    } else if (err.name === "SequelizeForeignKeyConstraintError") {
        res.status(404).json({ message: `Product not found` });
    }else if (err.name === "notAdmin") {
        res.status(404).json({ message: `Only admin can access this feature` });
    }else if (err.name === "noProductFound") {
        res.status(404).json({ message: `Product not found` });
    }
    else {
        res.status(500).json({ message: "Internal server error" })
    }
}

module.exports = { errorHandler }