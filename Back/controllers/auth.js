const models = require('../models/index.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();

exports.signup = async (req, res) => {
    if(req.body.email && req.body.password) {
        const testUser = await models.User.count({ where: { email: req.body.email }})
        if(testUser > 0) return res.status(400).json({ error: 'A user with that email already exists' })
        const hash = await bcrypt.hash(req.body.password, 10)
        const newUser = {
            ...req.body,
            password: hash
        }
        const userCreated = await models.User.create(newUser);
        if(userCreated) return res.status(201).json({ message: 'New user created!'})
        return res.status(400).json({error: 'Problem while creating new user'})
    }
    else return res.status(400).json({error: `Can't create user without email or password`})
}

exports.login = async (req, res) => {
    if(req.body.email == undefined) return res.status(400).json({error: 'No email was found in the request'})
    const user = await models.User.findOne({ where: { email: req.body.email }})
    if(!user) return res.status(404).json({ error: 'User not found!' })
    const match = await bcrypt.compare(req.body.password, user.password)
    if(match) {
        return res.status(200).json({
            token: jwt.sign(
                { userId: user.id },
                process.env.TOKEN_ENCRYPT,
                { expiresIn: '24h' }
            )
        })
    }
    else return res.status(400).json({ error: 'Password incorrect'})
}