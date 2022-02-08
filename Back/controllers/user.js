const models = require('../models/index');
const { decodeToken } = require('../utils/decodeToken');

exports.getAllUser = async (req, res) => {
    const allUser = await models.User.findAll({
        attributes: { exclude: ['password'] }
    })
    if (allUser === null) return errorNotFound(res, null)
    return res.status(200).json({data: allUser})
}

exports.getOneUser = async (req, res) => {
    const User = await models.User.findOne({
        where: {
            id: req.params.id
        },
        attributes: { exclude: ['password'] }
    })
    if (User === null) return errorNotFound(res, req.params.id)
    return res.status(200).json({data: User})
}

exports.getMyProfile = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const userId = decodeToken(token);
    const User = await models.User.findOne({
        where: {
            id: userId
        },
        attributes: { exclude: ['password'] }
    })
    if (User === null) return errorNotFound(res, req.params.id)
    return res.status(200).json({data: User})
}

exports.modifyUser = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const userId = decodeToken(token);
    let getUser = await models.User.update({
        ...req.body
    }, {
        where: {
            id: userId
        }
    })
    if(getUser == 0) return errorNotFound(res, userId)
    return res.status(200).json({message: 'User modified with success!'})
}

exports.deleteOneUser = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const userId = decodeToken(token);
    const deletedUser = await models.User.destroy({
        where: {
            id: userId
        },
        cascade: true
    })
    console.log(deletedUser)
    if(deletedUser == 0) return errorNotFound(res, userId)
    return res.status(200).json({message: 'User Deleted with success!'})
}

const errorNotFound = (res, id) => {
    let errorMessage = 'No users found!'
    if(id !== null) errorMessage = `No user found for the id : ${id}!`
    return res.status(404).json({error : errorMessage})
}