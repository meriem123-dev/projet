const postService = require("../services/posts.service");

//helper
function parse(original)
{
  const id = Number(original)
  return Number.isInteger(id) && id > 0 ? id:null;
}

async function createPost(req, res, next) {
  try {
    const { title, content,category,image,description,tags } = req.body ?? {};
    if (!title || !content || !description)
      return res.status(400).json({ error: "champs obligatoires" });
    const post = await postService.createPost(req.user.id,{ title, content,category,image,description,tags });
    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
}

async function findPosts(req, res, next) {
  try {
    res.json(await postService.FindAllPost());
  } catch (error) {
    next(error);
  }
}

async function findPost(req, res, next) {
  try {
    const id = parse(req.params.id);
    if (!id) return res.status(400).json({ error: "id invalide" });
    res.json(await postService.findPost(id));
  } catch (error) {
    next(error);
  }
}

async function updatePost(req, res, next) {
  try {
    const id = parse(req.params.id);
    if (!id) return res.status(400).json({ error: "id invalide" });

    const {title,content,category,image,description} = req.body ?? {};

    if(!title || !content) return res.status(400).json({ error: "title et content sont mandatory" }); ; 
    res.json(await postService.updatePost(id,{title,content,category,image,description} ));
  } catch (error) {
    next(error);
  }
}

async function removePost(req, res, next) {
  try {
    const id = parse(req.params.id);
    if (!id) return res.status(400).json({ error: "id invalide" });
    await postService.deletePost(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
module.exports = { createPost, findPosts, findPost, updatePost, removePost };
