const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const authConfig = require('../libs/authConfig');
const db = require('../models/index');

const role = db.role;
const user = db.user;

const register = async (req, res) => {

    let User_Name = req.body.User_Name;
    let Role_ID = req.body.Role_ID;
    let User_User = req.body.User_User;
    let User_Password = req.body.User_Password;
    let passHash = await bcrypt.hash(User_Password, +authConfig.rounds)

    user.create({
        User_Name: User_Name,
        Role_ID: Role_ID,
        User_User: User_User,
        User_Password: passHash
    }).then(response => {
        res.json({ response });
    }).catch(err => {
        res.status(500).json(err);
    });
}
const login = async (req, res) => {
    const User_User = req.body.User_User;
    const User_Password = req.body.User_Password;

    const response = await user.findOne({ where: { User_User: User_User } });

    if (response) {
        const password_valid = await bcrypt.compare(User_Password, response.User_Password);
        if (password_valid) {

            let token = jwt.sign({ response: response }, authConfig.secret, {
                expiresIn: authConfig.expires
            });
            res.cookie('jwt', token, {
                httpOnly: true,
                maxAge: 09 * 60 * 60 * 1000 // 1 day
            })
            res.status(200).json({
                token: token,
                status: "ok"
            });

        } else {
            console.log('Password Incorrect')
            res.status(200).json({ error_msg: "Password Incorrect" });
        }

    } else {
        console.log('User does not exist')
        res.status(200).json({ error_msg: "User does not exist" });
    };
}

const logout = async (req, res) => {
    res.cookie('jwt', '', {maxAge: 0})

    res.send({
        message: 'U re logout'
    })
}

const showUser = async (req, res) => {
    await  user.findAll({
        include:{
          model: role
        }
      })
        .then(result => res.json(result))
        .catch(error => {
          res.status(412).json({msg: error.message});
        });
}

module.exports = {
    register,
    login,
    logout,
    showUser,
}
