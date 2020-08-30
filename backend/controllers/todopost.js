const Todo = require('../models/todo.js');

exports.posts = function(req, res, next) {
        const title = req.body.title
        const content = req.body.content

        if(!title && !content) {
                return res.status(422).send({
                        error: `You must provide title and content`
                })
        }

        //if a user with email does not exist, reate and save user record
        const NewPost = new Todo({
                title: title,
                
                content: content
        })

        NewPost.save(function(err) {
                if(err) {
                        return (
                                next(err)
                        )
                }
                
                res.json({success: true})
        })
};

exports.getPosts = function(req, res) {
        Todo.find({}, function(err, docs) {
                res.json(docs)
        })
};

exports.getPost = function(req, res) {
        const id = req.params.id
        Todo.findById(id, function(err, docs) {
                res.json(docs)
        })
};

exports.deletePost = function(req, res) {
        const id = req.params.id
        Todo.findById(id, function(err, post) {
                return (
                        post.remove(function(err) {
                                if(!err) {
                                        return (
                                                res.send({removed: true})
                                        )
                                } else {
                                        console.log(err);
                                        return (
                                                res.send('ERROR')
                                        )
                                }
                        })
                )
        })
}
