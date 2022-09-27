const Image = require('../models/image');
const Post = require('../models/post');

class imageController{

    addForm(req, res){
        const post = req.params.id;
        
        res.render('add-image', { post });
    }

    async add(req, res){
        const post = await Post.getById(req.body.post);
        const url = req.body.image;
        const image = new Image(url, post);
        image.add(async () => {
            let msg = 'Imagem cadastrada com sucesso!';
            const posts = await Post.listAll();
            const images = await Image.listAll();
            const date = [];
            for (let i = 0; i < posts.length; i++) {
                date.push(posts[i].getDateFormatter());
            }
            let d = 0;
            res.render('index', { posts, date, msg, images, d });
        })
    }

    updateForm(req, res) {
        console.log('alterando imagem!');
        res.end('alterando imagem!');
    }

    async delete(req, res){
        const id = req.params.id;
        const post = await Post.getById(req.params.post);
        Image.delete(id, async () => {
            const images = await Image.listAllId(post);
            const date = post.getDateFormatter();
            let msg = 'imagem deletada com sucesso!';
            res.render('postDetails', {images, post, date, msg});
        })
    }
}

module.exports = imageController;