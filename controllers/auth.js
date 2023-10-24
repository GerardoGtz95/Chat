const { response } = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs')
const { generateJWT } = require('../helpers/token')

const createUser = async (req, res = response) => {
    try {
        const {email, password} = req.body;

        const emailExist = await User.findOne({ email });

        if(emailExist) {
            console.log('Existe ', emailExist)
            return res.status(400).json({
                ok: false,
                message: 'Email already exist'
            })
        }

        const user = new User(req.body);

        const salt = bcrypt.genSaltSync()

        user.password = bcrypt.hashSync(password, salt)

        await user.save();

        const token = await generateJWT(user.id)

        return res.json({user, token})

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Internal Server Error'
        })
    }
}

const login = async (req, res) => {
    const { body } = req;
    res.json({
        ok: false,
        msg: 'Server Error'
    })
}

const renewToken = async (req, res) => {
    res.json({
        ok: true,
        msg: 'renewed'
    })
}

module.exports = {
    createUser,
    login,
    renewToken
}