import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {AUTH_USER} from './actions/types'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'


import reducers from './reducers';


import promise from 'redux-promise';
import reduxThunk from 'redux-thunk'



import App from './Components/App';
import PostsIndex from './Components/posts_index';
import PostsNew from './Components/posts_new';
import PostsShow from './Components/posts_show';
import Signin from './Components/auth/signin'
import Signout from './Components/auth/signout'
import Signup from './Components/auth/signup'
import NoMatch from './Components/404'
import RequireAuth from './Components/auth/require_auth'
const store = createStore(
  reducers,
  applyMiddleware(reduxThunk,promise)
)

const token = localStorage.getItem('token')
//if we have a token, consider the user to be signed in
if(token){
  store.dispatch({
    type: AUTH_USER
  })
}


ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App>
        <Switch>
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/signout" component={Signout} />
          <Route  path="/signup" component={Signup} />
          <Route  exact  path="/" component={PostsIndex} />
          <Route path="/posts/new" component={RequireAuth(PostsNew)} />
          <Route path="/posts/:id" component={PostsShow} />
          <Route component={NoMatch} />
        </Switch>
      </App>
    </Router>
  </Provider>
  , document.getElementById('root'));