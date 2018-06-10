import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import uuidv1 from 'uuid/v1'
import serializeForm from 'form-serialize'
import Timestamp from 'react-timestamp'
import { loadPost, deletePost, votePost, loadComments, addComment, deleteComment, voteComment} from '../actions'
import moodHappy from '../arrow-thick-up.svg'
import moodSad from '../arrow-thick-down.svg'

class ShowPost extends Component {

  state = {
    author: '',
    body: ''
  };

  componentDidMount() {
    this.props.loadComments(this.props.match.params.post_id);
    this.props.loadPost(this.props.match.params.post_id);
  };

  deletePost = postId => {
    this.props.deletePost(postId);
    this.props.history.push('/');
  };

  votePost = (id, value) => {
    this.props.votePost(id, value);
  };

  deleteComment = commentId => {
    this.props.deleteComment(commentId);
    this.props.loadPost(this.props.match.params.post_id);
  };

  voteComment = (id, value) => {
    this.props.voteComment(id, value);
  };

  handleInputChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  handleSaveComment = (event) => {
    event.preventDefault();
    const values = serializeForm(event.target, { hash: true })
    this.props.addComment(values);
    this.setState({
      author: '',
      body: ''
    });
    this.props.loadPost(this.props.match.params.post_id);
  };

  render() {

    const { posts } = this.props.posts;
    const { comments } = this.props.comments;

    return (
      <div className='container mx-auto bg-grey m-6 p-6 rounded shadow-lg'>

        <div>Post Detail Page</div>
        <div><Link to={'/'} key='back'>Back</Link></div>
        {
          posts && posts.length > 0 && Object.keys(posts[0]).length && !posts[0].error ? (<div>
            {
              posts.filter( post => !post.deleted).map(post => (


                <div key={post.id} className='flex-1 text-grey-darker bg-grey-light px-4 py-2 m-2'>


                  <div className='max-w-xl overflow-hidden'>
                    <div className='px-6 py-4'>
                      <div className='font-bold text-xl mb-2'><Link to={`/${post.category}/${post.id}`} className='no-underline text-grey-darker'>{ post.title }</Link></div>
                      <p className='text-grey-darker text-base'>
                        {post.body}
                      </p>
                    </div>
                    <div className='px-6 py-4'>

                    <span className='inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2'>
                      <img src={moodHappy} className='h-4 w-4 inline-block' alt='upVote' onClick={ () => this.votePost( post.id, 'upVote' ) }/>
                      Score: { post.voteScore }
                      <img src={moodSad} className='h-4 w-4 inline-block' alt='downVote' onClick={ () => this.votePost( post.id, 'downVote' ) }/>
                    </span>

                      <span className='inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2'>{post.author}</span>
                      <span className='inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2'><Timestamp time={ post.timestamp / 1000 } format='full' /></span>
                      <span className='inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2'>{post.category}</span>
                      <span className='inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker'>#{post.commentCount}</span>
                    </div>
                  </div>

                  <div className='flex flex-row'>
                    <div className='flex-1 text-red-darker text-left bg-grey-light px-4 py-2'><button className='text-red-darker' onClick={ () => this.deletePost( post.id ) }>Remove Post</button></div>
                    <div className='flex-1 text-green-darker text-right bg-grey-light px-4 py-2'><Link to={`/editpost/${post.id}`}><button className='text-green'>Edit Post</button></Link></div>
                  </div>

                  <div className='flex flex-row'>
                    <div>
                    <span className='inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2'>Comments for this Post</span>
                     { comments && comments.length > 0  && comments.filter ( comment => !comment.deleted ).map( comment => (
                      <div key={uuidv1()} className='max-w-xl overflow-hidden'>
                        <div className='px-6 py-4'>
                          <p className='text-grey-darker text-base'>{comment.body}</p>
                        </div>
                        <div className='px-6 py-4'>
                          <span className='inline-block bg-grey-lighter rounded-full px-3 py-1 text-xs font-semibold text-grey-darker mr-2'>
                            <img src={moodHappy} className='h-4 w-4 inline-block' alt='upVote' onClick={ () => this.voteComment(comment.id, 'upVote' ) }/>
                            Score: { comment.voteScore }
                            <img src={moodSad} className='h-4 w-4 inline-block' alt='downVote' onClick={ () => this.voteComment(comment.id, 'downVote' ) }/>
                          </span>
                          <span className='text-xs inline-block bg-grey-lighter rounded-full px-3 py-1 font-semibold text-grey-darker mr-2'>{comment.author}</span>
                          <span className='text-xs inline-block bg-grey-lighter rounded-full px-3 py-1 font-semibold text-grey-darker mr-2'><Timestamp time={ comment.timestamp / 1000 } format='full' /></span>
                        </div>
                        <div className='flex-1 text-red-darker text-left bg-grey-light px-4 py-2'>
                          <button className='text-red-darker' onClick={ () => this.deleteComment(comment.id) }>Delete Comment</button>
                        </div>
                        <div className='flex-1 text-green-darker text-right bg-grey-light px-4 py-2'>
                          <Link to={`/editcomment/${comment.id}`}><button className='text-green'>Edit Comment</button></Link>
                        </div>
                      </div>
                    ))
                    }

                <div className='flex flex-row'>
                  <form className='w-full max-w-md' onSubmit={ this.handleSaveComment }>
                    <input type='hidden'  name='id' value={uuidv1()}/>
                    <input type='hidden'  name='parentId' value={post.id}/>
                    <input type='hidden'  name='timestamp' value={Date.now()}/>
                    <input type='hidden'  name='deleted' value='false'/>
                    <input type='hidden'  name='parentDeleted' value='false'/>
                    <input type='hidden'  name='voteScore' value='1'/>

                    <div className='flex flex-wrap -mx-3 mb-6'>
                      <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
                        <label className='block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2' htmlFor='grid-author-name'>
                          Author
                        </label>
                        <input id='grid-author-name' type='text' placeholder='author' name='author' value={this.state.author} onChange={this.handleInputChange} className='appearance-none block w-full bg-white text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3 leading-tight' />
                      </div>
                      <div className='w-full md:w-1/2 px-3'>
                        <label className='block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2' htmlFor='grid-comment-text'>
                          Comment
                        </label>
                        <textarea name='body' value={this.state.body}  onChange={this.handleInputChange} className='appearance-none block w-full bg-white text-grey-darker border border-grey-lighter rounded py-3 px-4 leading-tight' id='grid-comment-text' type='text' placeholder='Insert comment'/>
                      </div>
                      <div className='flex flex-row'>
                        <div className='flex-1 text-red-darker text-left bg-grey-light px-4 py-2'>
                          <button className='text-green'>Add Comment</button>
                        </div>
                      </div>
                    </div>

                  </form>
                </div>
              </div>
              </div>
              </div>
              ))
            }
            </div>) : (<div>Post not found! 404 <Link to={'/'} key='back'>Back</Link></div>)
        }

      </div>
    );
  }

}

const mapStateToProps = ({ posts, comments }) => ({
  posts,
  comments
});

const mapDispatchToProps = dispatch => ({
  loadComments: postId => dispatch(loadComments(postId)),
  loadPost: postId => dispatch(loadPost(postId)),
  deletePost: postId => dispatch(deletePost(postId)),
  votePost: (postId, option) => dispatch(votePost(postId, option)),
  addComment: comment => dispatch(addComment(comment)),
  deleteComment: commentId => dispatch(deleteComment(commentId)),
  voteComment: (commentId, option) => dispatch(voteComment(commentId, option))
});

export default connect(mapStateToProps, mapDispatchToProps)(ShowPost);
