const Post = require('../models/post');
const Image = require('../models/image');
const { listAll } = require('../models/post');

class PostController{

    async listAll(req, res){
        const posts = await Post.listAll();
        const images = await Image.listAll();
        const date = [];
        
        for (let i = 0; i < posts.length; i++) {
            date.push(posts[i].getDateFormatter());
        }
        let d = 0;
        res.render('posts', { posts, date, images });
    }

    async list(req, res) {
        const posts = await Post.listAll();
        const images = await Image.listAll();
        const date = [];
        for(let i = 0; i < posts.length; i++){
            date.push(posts[i].getDateFormatter());
        }
        let d = 0;
        res.render('index', { posts, date, images, d });
    }

    addPost(req, res){
        res.render('add-post');
    }

    async add(req, res){
        const date = new Date();
        const offset = date.getTimezoneOffset();
        const created_at = date - offset;  
        const post = new Post(req.body.title, req.body.description, req.body.author, created_at);
        let posts = await Post.listAll();
        post.save(async () =>{
            let msg = 'Post cadastrado com sucesso!';
            posts = await Post.listAll();
            
            const date = [];
            for (let i = 0; i < posts.length; i++) {
                date.push(posts[i].getDateFormatter());
            }
            let d = 0;
            const image = new Image(req.body.url, posts[0]);
            image.add(async () => {})
            const images = await Image.listAll();
            res.render('index', { posts, date, msg, images, d });
        })  
    }

    remove(req, res){
        const id = req.params.id;
        Image.deleteAllPostId(id, ()=>{

        });
        Post.delete(id, async () => {
            let msg = 'Post removido com sucesso!';
            const posts = await Post.listAll();
            const date = [];
            for (let i = 0; i < posts.length; i++) {
                date.push(posts[i].getDateFormatter());
            }
            const images = await Image.listAll();

            let d = 0;
            res.render('index', { posts, date, msg, images, d });
        });

    }

    async updateForm(req, res){
        const id = req.params.id;
        const post = await Post.getById(id);
        
        res.render('updateForm', {post});
    }

    update(req,res){
        let id, title, description, author, created_at;
        id = req.body.id;
        title = req.body.title;
        description = req.body.description;
        author = req.body.author;
        created_at = req.body.created_at;
        const post = new Post(title, description, author, created_at, id);
        post.update(async () => {
            let msg = 'Post alterado com sucesso!';
            const posts = await Post.listAll();
            const date = [];
            for (let i = 0; i < posts.length; i++) {      
                date.push(posts[i].getDateFormatter());
            }
            const images = await Image.listAll();
            let d = 0;
            res.render('index', { posts, date, msg, images, d });
        });


    }

    async postDetails(req, res){
        const post = await Post.getById(req.params.id);
        const images = await Image.listAllId(post);
        const date = post.getDateFormatter();
        res.render('postDetails', {post, images, date});
    }
    
};

module.exports = PostController;