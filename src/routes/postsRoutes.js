const express = require('express');

const postRouter = express.Router();

const PostController = require('../controllers/postController');
const postController = new PostController;

postRouter.get('/list', postController.list);
postRouter.get('/add-post', postController.addPost);
postRouter.post('/', postController.add);
postRouter.get('/', postController.listAll);


module.exports = postRouter;