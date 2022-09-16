const express = require('express');

const postRouter = express.Router();

const PostController = require('../controllers/postController');
const postController = new PostController;

postRouter.get('/', postController.listAll);

module.exports = postRouter;