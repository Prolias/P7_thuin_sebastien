const models = require('../models/index')
const { decodeToken } = require('../utils/decodeToken')

exports.getAllComments = async (req, res) => {
    try{
        const Comments = await models.Comments.findAll({
            include: models.Comments,
            where: {
                postId: req.params.id,
                // mainCommentId: null
            }
        })
        if(Comments.length == 0) return errorNotFound(res, null)
        return res.status(200).json({data: Comments})
    }
    catch(err) {
        return res.status(500).json({error: err.message})
    }
}

exports.createNewComment = async (req, res) => {
    if(await models.Post.findOne({where: {id: req.params.id}}) === null) {
        return res.status(400).json({error: 'No post was found for this id!'})
    }
    const token = req.headers.authorization.split(' ')[1];
    const userId = decodeToken(token);
    const newComment = await models.Comments.create({
        ...req.body,
        userId: userId,
        postId: req.params.id
    })
    if(newComment) return res.status(201).json({message: `Comment created!`})
    return res.status(404).json({error: 'Error while creating new comment!'})
}

exports.getAllCommentsFromComment = async (req, res) => {
    try {
        const Comments = await models.Comments.findAll({
            where: {
                postId: req.params.id,
                mainCommentId: req.params.idCom
            }
        })
        if(Comments.length == 0) return errorNotFound(res, req.params.idCom)
        return res.status(200).json({data: Comments})
    }
    catch(err) {
        return res.status(500).json({error: err})
    }
}

exports.modifyOneComment = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const userId = decodeToken(token);
    const modifiedComment = await models.Comments.update({
        message: req.body.message
    }, {
        where: {
            id: req.params.idCom,
            userId: userId
        }
    })
    if(modifiedComment == 0) return errorNotFound(res, req.params.id)
    return res.status(200).json({message: 'Comment modified with success!'})
}

exports.deleteOneComment = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const userId = decodeToken(token);
    const deletedComment = await models.Comment.destroy({
        where: {
            id: req.params.idCom,
            userId: userId
        }
    })
    if(deletedComment == 0) return errorNotFound(res, req.params.idCom)
    return res.status(200).json({message: `Comment deleted with success!`})
}

const errorNotFound = (res, id) => {
    let errorMessage = 'No comments found!'
    if(id !== null) errorMessage = `No comments found for the id : ${id}!`
    return res.status(404).json({error : errorMessage})
}