const Authentication = require('./controllers/authentication.js');
const Todo = require('./controllers/todopost.js');
const passportService = require('./services/passport.js');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', {session: false})
const requireSignin = passport.authenticate('local', {session: false})

module.exports = function(app) {
        app.get('/', requireAuth, function(req, res) {
                res.send({hi: 'there'})
        })

        app.post('/signin', requireSignin, Authentication.signin);
        app.post('/signup', Authentication.signup);
        app.post('/posts', Todo.posts);
        app.get('/posts', Todo.getPosts);
        app.get('/posts/:id', Todo.getPost);
        app.delete('/posts/:id', Todo.deletePost);
}
