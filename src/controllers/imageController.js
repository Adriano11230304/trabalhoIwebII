const Image = require('../models/image');
const Post = require('../models/post');

class imageController{
    async list(req, res){
        const post = await Post.getById(1);
        const images = await Image.listAllId(post);

        res.render('imagesPost', { images });
    }

    addForm(req, res){
        const post = req.params.id;
        
        res.render('add-image', { post });
    }

    async add(req, res){
        const post = await Post.getById(req.body.post);
        const url = req.body.image;
        const image = new Image(url, post);
        image.add(req.body.post, async () => {
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
}

module.exports = imageController;