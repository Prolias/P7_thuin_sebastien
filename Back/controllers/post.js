const models = require('../models/index.js');
const { decodeToken } = require('../utils/decodeToken.js');

exports.getAllPosts = async (req, res) => {
    const Posts = await models.Post.findAll()
    if(Posts.length == 0) return res.status(404).json({error : 'No post found with this id!'})
    return res.status(200).json({data: Posts})
}

exports.getOnePost = async (req, res) => {
    const Post = await models.Post.findOne({
        where: {id: req.params.id}
    })
    if(Post === null) return res.status(404).json({error : 'No post found for this id!'})
    return res.status(200).json({data: Post})
}

exports.createPost = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const userId = decodeToken(token);
    if(await models.User.findOne({where: {id: userId}}) === null) {
        return res.status(400).json({error: 'No user was found for this id!'})
    }
    const newPost = models.Post.build({
        title: req.body.title,
        userId: userId,
        mediaType: req.body.media.type,
        mediaContent: req.body.media.content
    })
    const savedPost = await newPost.save()
    if(savedPost) return res.status(201).json({ message: 'New post created!'})
    return res.status(400).json({error: 'Problem while creating new post'})
}

exports.modifyPost = async (req, res) => {
    const modifiedPost = await models.Post.update({
        title: req.body.title,
        mediaType: req.body.media.type,
        mediaContent: req.body.media.content
    }, {
        where: {
            id: req.params.id
        }
    })
    if(modifiedPost == 0) return res.status(404).json({error : 'No post found for this id!'})
    return res.status(200).json({message: 'Post modified with success!'})
}

exports.deleteOnePost = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const userId = decodeToken(token);
    const deletedPost = models.Post.destroy({
        where: {
            id: req.params.id,
            userId: userId
        }
    })
    if(deletedPost == 0) return res.status(404).json({error : 'No post found for this id!'})
    return res.status(200).json({ message: 'Post deleted with success!'})
}