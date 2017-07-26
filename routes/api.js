var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Post = mongoose.model('Posts');

router.use(function(req, res, next){
	if(req.method === 'GET'){
		return next();
	}
	if(!req.isAuthenticated()){
		return res.redirect('/#login');
	}
	return next();
});


/* GET home page. */
router.route('/posts')
	  .post(function(req, res){
		var newPost = new Post();
		newPost.text = req.body.text;
		newPost.created_by = req.body.created_by;
		newPost.save(function(err, data){
			if(err){
				return res.send(500, err);
			}
			return res.json(data);
		});
		//   res.send({message:'to create a new post'});
	  })
	  .get(function(req, res){
		  Post.find(function(err,data){
			  if(err){
				  res.send(500, err);
			  }
			  return res.send(data);
		  });
		//   res.send({message:'to get all the posts'});
	  });
router.route('/posts/:id')
	  .get(function(req,res){
		  Post.findById(req.params.id, function(err, post){
			  if(err){
				  res.send(err);
			  }
			  res.json(post);
		  })
			// res.send({message: 'to return post with id' + req.params.id});
	   })
	  .put(function(req,res){
		  Post.findById(req.params.id, function(err, post){
			  if(err){
				  res.send(err);
			  }
			  post.created_by = req.body.created_by;
			  post.text = req.body.text;

			  post.save(function(err, data){
				if(err){
					res.send(500, err);
				}
				res.json(data);
			});
		  })
			// res.send({message: 'to modify post with id' + req.params.id});
	   })
	   .delete(function(req,res){
		   Post.remove({
			   _id: req.params.id
		   },function(err){
			   if(err){
				   res.send(err);
			   }
			   res.json("deleted :(");
		   });
			// res.send({message: 'to delete post with id' + req.params.id});
	   });

module.exports = router;
