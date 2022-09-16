const postModel = require('../models/postModel');

module.exports = class PostController{

    listAll(req, res){
        console.log('todos Posts');
        res.render('posts');
    }
    
};