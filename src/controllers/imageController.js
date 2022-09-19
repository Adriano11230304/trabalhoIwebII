const Image = require('../models/image');
const Post = require('../models/post');

class imageController{
    async list(req, res){
        const post = await Post.getById(1);
        const images = await Image.listAll(post);
        console.log({images});
        res.end('finalizado');
    }
}

module.exports = imageController;