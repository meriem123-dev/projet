const express = require('express');
const controller = require("../controllers/posts.controller");
const authMiddlware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post('/',authMiddlware.authenticate,controller.createPost);
router.get('/',controller.findPosts);
router.get('/:id',controller.findPost);
router.put('/:id',controller.updatePost);
router.delete('/:id',authMiddlware.authenticate,authMiddlware.authorize("ADMIN"),controller.removePost);

module.exports= router;