const post = require('../models/post');

class PostController{

    async listAll(req, res){
        const posts = await post.listAll();
        // const images = await image.listAll();
        res.render('posts', { posts });
    }

    async list(req, res) {
        const posts = await post.listAll();
        // const images = await image.listAll();
        res.render('index', { posts });
    }
    
};

module.exports = PostController;