const postRepo = require("../repositories/posts.repository");

async function createPost(userId,{title,content,category,image,description,tags})
{
 const cleantags=[...new Set((tags??[]).map((t)=>(t.trim().toLowerCase())))].filter(Boolean);
 return await postRepo.create({title,content,category,authorId:userId,image,description,tags:cleantags});
}

async function FindAllPost() {
   return await postRepo.findAll()
}

async function findPost(id) {
    const post=await postRepo.find(id);
    if(!post)
    {
      const err = new Error("Post non trouvé !")
      err.status=404;
      throw err;
    }
    return post;  
}

async function updatePost(id,{title,content,category,image,description}) {

    await findPost(id);
    return await postRepo.update(id,{title,content,category,image,description});
    
}

async function deletePost(id) {
    await findPost(id);
    return await postRepo.remove(id);
}
module.exports={createPost,FindAllPost,findPost,updatePost,deletePost};