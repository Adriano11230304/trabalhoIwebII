const postModel = require('../models/postModel');

class PostController{

    listAll(req, res){
        console.log('todos Posts');
        res.render('posts');
    }
    
};

module.exports = PostController;