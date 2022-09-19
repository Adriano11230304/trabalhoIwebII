const Post = require('../models/post');

class PostController{

    async listAll(req, res){
        const posts = await Post.listAll();
        // const images = await image.listAll();
        const date = [];
        for (let i = 0; i < posts.length; i++) {
            date.push(posts[i].getDateFormatter());
        }
        res.render('posts', { posts, date });
    }

    async list(req, res) {
        const posts = await Post.listAll();
        // const images = await image.listAll();
        const date = [];
        for(let i = 0; i < posts.length; i++){
            date.push(posts[i].getDateFormatter());
        }
        console.log(posts);
        res.render('index', { posts, date });
    }

    addPost(req, res){
        res.render('add-post');
    }

    async add(req, res){
        const date = new Date();
        const offset = date.getTimezoneOffset();
        const created_at = date - offset;
        const post = new Post(req.body.title, req.body.description, req.body.author, created_at);
        const posts = await Post.listAll();
        post.save(() =>{
            let msg = 'Post cadastrado com sucesso!';           
            res.redirect('/');
        })  
    }
    
};

module.exports = PostController;