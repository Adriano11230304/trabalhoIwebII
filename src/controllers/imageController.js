const Image = require('../models/image');
const Post = require('../models/post');

class imageController{
    async list(req, res){
        const post = await Post.getById(1);
        const images = await Image.listAllId(post);

        res.render('imagesPost', { images });
    }
}

module.exports = imageController;