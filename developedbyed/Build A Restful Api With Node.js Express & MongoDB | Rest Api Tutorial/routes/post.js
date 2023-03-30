const express = require('express');
const router = express.Router();
const Post = require('../models/Post')

router.get('/post', async(req,res) => {
    try {
        const posts = await Post.find();
        res.send(posts);
    } catch (err) {
        res.json(`message ${err}`)
    }
})

// router.post('/', (req,res)=>{
//     const post = new Post({
//         title: req.body.title,
//         description: req.body.description,
//     });
//     post.save()
//     .then( data => {
//         res.status(200).json(data);
//     })
//     .catch(err => {
//         res.status(404).json(err);
//     })
// })

router.post('/post', async(req,res)=>{
    const post = new Post({
        title: req.body.title,
        description: req.body.description,
    });
    const savedPost = await post.save()
  try {
    res.json(savedPost);
  } catch (err) {
    res.json(`message ${err}`)
  }
});

router.get('/post/:id', async(req,res)=>{
    try {
        const post =  await Post.findById(req.params.id);
        res.json(post);
    } catch (err) {
        res.json(err);
    }
    
});

router.delete('/post/:id', async (req, res) => {
    try {
      const deletedPost = await Post.findByIdAndDelete(req.params.id);
      if (deletedPost) {
        res.status(200).json({ Deleted: deletedPost });
      } else {
        res.status(404).json({ message: 'Post not found' });
      }
    } catch (err) {
      res.json(err);
    }
  });

  router.put('/post/:id', async(req, res) => {
    try {
      const updatedPost = await Post.updateOne(
        { _id: req.params.id },
        { $set: { title: req.body.title, description: req.body.description }}
      );
      res.json(updatedPost);
    } catch (error) {
      res.json(`message ${error}`);
    }
  });
  
  
module.exports = router;