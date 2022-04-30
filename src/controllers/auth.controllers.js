const jwt = require('jsonwebtoken');
const authConfig = require('../libs/authConfig');
const db = require('../models/index');

const role = db.role;
const user = db.user;

const auth = async (req, res, next) => {
    try {
        const cookie = req.cookies['jwt']
        const claims = jwt.verify(cookie, authConfig.secret)
       if (!claims) {
            return res.status(401).send({
                message: 'unauthenticated'
            })
        }
        console.log(claims.response.User_ID)
        const User = await user.findOne({
            include: {
                model: role
            },
            where: {
                User_ID: claims.response.User_ID
            }
        })
        req.user = User.dataValues;
        next();

    } catch (e) {
        return res.status(401).send({
            message: 'unauthenticated'
        })
    }
}

module.exports = {
    auth,
}
