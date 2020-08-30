import React, { Component } from 'react'
import {connect} from 'react-redux'
import {fetchPosts} from '../actions/index'
import {Link} from 'react-router-dom'

class PostsIndex extends Component{
  componentWillMount(){
    this.props.fetchPosts();
  }
  renderPosts(){
    return this.props.posts.map((post)=>{
      return (
        <li className="list-group-item" key={post._id}>
          <Link to={"posts/" + post._id} >
         
          <strong>{post.title} </strong>
          </Link>
        </li>
      )
    })
  }
  renderPostButton () {
    if (this.props.authenticated) {
      return(
      <Link to="/posts/new" className="btn btn-success"> Add a Todo </Link>
      )
    }
  }
  render(){
    return(
      <div>
        <div className="pull-right">
          {this.renderPostButton()}
        </div>
        <h3>Todos</h3>
        <hr/>
        <ul className="list-group">
          {this.renderPosts()}
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts.all,
    authenticated: state.auth.authenticated
  }

}

export default connect(mapStateToProps,{fetchPosts}) (PostsIndex)