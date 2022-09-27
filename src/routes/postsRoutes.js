const express = require('express');

const postRouter = express.Router();

const PostController = require('../controllers/postController');
const postController = new PostController;

const ImageController = require('../controllers/imageController');
const imageController = new ImageController;

postRouter.get('/list', postController.list);
postRouter.get('/add-post', postController.addPost);
postRouter.get('/delete/:id', postController.remove);
postRouter.get('/update/:id', postController.updateForm);
postRouter.post('/:id', postController.update);
postRouter.post('/', postController.add);
postRouter.get('/', postController.listAll);
postRouter.get('/posts/:id', postController.postDetails);


// Rotas para as imagens
postRouter.get('/images/add/:id', imageController.addForm);
postRouter.post('/images/add', imageController.add);
postRouter.get('/images/delete/:post/:id', imageController.delete);




module.exports = postRouter;