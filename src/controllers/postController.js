const post = require('../models/post');

class PostController{

    async listAll(req, res){
        const posts = await post.listAll();
        console.log('teste2');
        console.log(posts);
        res.end('finalizado');
        // res.render('posts');
    }
    
};

module.exports = PostController;