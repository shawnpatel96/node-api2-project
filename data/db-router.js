const express = require('express');
const db = require('./db.js')

// Upper case R on router, also it is invoked 
const router= express.Router()   // this is what we are exporting

// the router handles endpoints that begin with /api/hubs
// router only cares about what comes after /api/hubs
router.get('/', (req,res)=>{
    const environment=process.env;
    const port=process.env.PORT || 5000
    res.status(200).json({ api: 'up', port, environment });
    db.find()
    .then(posts=>{
        res.status(200).json({
            motd: process.env.MOTD,
            posts});
    })
    .catch(error=>{
        res.status(500).json({
            message: "Error retrieving the hubs"
        })
    })
});
router.get('/:id', (req,res)=>{
    db.findById(req.params.id)
    .then(post=>{
        if(post.length){
        res.status(200).json({ 
            port,
            motd: process.env.MOTD,
            post})
        }else {
            res.status(404).json({message:'Hub not Found'})
        }
    })
    .catch(error=>{
        res.status(500).json({message: 'Error retrieving the post'})
    })
});
router.get('/:id/comments', (req,res)=>{
    if(!req.params.id){
        res.status(400).json({error:'The comment could not be retrieved'})
    } else{
        db.findPostComments(req.params.id)
        .then(comments=>{
            if(!comments){
                res.status(404).json({message: 'The Comment with said ID does not exist'});
            } else {
                res.status(200).json(comments);
            }
        })
        .catch(error=>{
            res.status(500).json({message: 'The comment could not be retrieved'})
        })
    }
});
router.post('/', (req, res)=>{
    if(!req.body.title || !req.body.contents){
        res.status(400).json({message:'Error Adding Post'})
    } else{
        db.insert(req.body).then(postID =>{
            res.status(201).json(postID)
        })
        .catch(error=>{
            res.status(500).json({message: 'Error posting the post(PUN INTENDED) to DB.'})
        })
    }
});
router.post('/:id/comments', (req,res)=>{
    if(!req.params.id || !req.body.text || !res.body.post_id){
        res.status(400).json({message:' Error posting the comment, provide all details you spud.'})
    }else{
        db.insertComment(req.body)
        .then(commentID=>{
            res.status(201).json(commentID)
        })
        .catch(error=>{
            res.status(404).json({message: 'post with said id does not exist'})
        })
    }
});
router.put('/:id', (req,res)=>{
    if(!req.body.title || !req.body.contents){
        res.status(400).json({message:'Error updating the post, provide all the details you spud.'})
    } else{
        db.update(req.params.id, req.body)
        .then(()=>{
            db.findById(req.params.id)
            .then(post=>{
                res.status(200).json(post)
            })
            .catch(error=>{
                res.status(500).json({message:' post could not be found'})
            })
        })
        .catch(error=>{
            res.status(500).json({message: 'post not modified'})
        })
    }
});
router.delete('/:id', (req,res)=>{
    db.findById(req.params.id)
    .then(post=>{
        db.remove(req.params.id)
        .then(()=>{
            res.status(200).json(post)
        })
        .catch(error=>{
            res.status(500).json({message: 'post not removed"'})
        })
    })
    .catch(error=>{
        res.status(500).json({message:'post with id not found'})
    })
});




module.exports=router;