import React, { Component } from 'react'
import { connect } from 'react-redux'
import Timestamp from 'react-timestamp'
import { Link } from 'react-router-dom'
import { loadPostsByCategory, loadCategories, deletePost, changeSorting, votePost } from '../actions'
import moodHappy from '../arrow-thick-up.svg'
import moodSad from '../arrow-thick-down.svg'

class MainPage extends Component {

componentDidMount() {
  this.props.loadPostsByCategory(this.props.match.params.category);
  this.props.loadCategories();
}

changeSorting = (sorting) => {
  this.props.changeSorting({ sorting });
}

votePost = (id, value) => {
  this.props.votePost(id, value);
}

deletePost = (id) => {
  this.props.deletePost(id);
};

componentWillUpdate(nextProps) {
  const category = nextProps.match.params.category;
  if (category !== this.props.match.params.category) {
    this.props.loadPostsByCategory(category);
 }
}

render() {
  const {posts} = this.props.posts
  const {sorting} = this.props.sorting
  const categories = this.props.categories

  return(
    <div className='container mx-auto bg-grey m-6 p-6 rounded shadow-lg'>
    <div>Category Posts Page</div>
    <div className='flex bg-grey-lighter'>

      <div className='flex-1 text-grey-darker text-center bg-grey-light px-4 py-2 m-2'><Link to={'/'} key='all'>All</Link></div>
      {
        categories && categories && categories.length > 0 && categories.map( category =>(
          <div className='flex-1 text-grey-darker text-center bg-grey-light px-4 py-2 m-2' key={category.name}><Link to={`/${category.path}`}>{ category.name }</Link></div>
        ))
      }
    </div>
    <div className='flex bg-grey-lighter'>
      <div className='flex-1 text-grey-darker text-center bg-grey-light px-4 py-2 m-2'><button onClick={ () => this.changeSorting('votescore') }>VoteScore</button></div>
      <div className='flex-1 text-grey-darker text-center bg-grey-light px-4 py-2 m-2'><button onClick={ () => this.changeSorting('timestamp') }>Timestamp</button></div>
      <div className='flex-1 text-grey-darker text-center bg-green-light px-4 py-2 m-2'><Link to='/addpost'><button>Add Post</button></Link></div>
    </div>

    <div className='container mx-auto bg-grey-lighter m-6 p-6 rounded shadow-lg'>
      { posts && posts.length > 0 && posts.filter(post => !post.deleted)
        .sort(( a, b ) => {
          switch ( sorting ) {
            case 'timestamp':
              return b.timestamp - a.timestamp;
            default:
              return b.voteScore - a.voteScore;
          }
        })
        .map( post => (
          <div key={post.id} className='flex-1 text-grey-darker text-center bg-grey-light px-4 py-2 m-2'>
          <div className='flex flex-row'>
            <div className='flex-1 text-grey-darker text-left bg-grey-light px-4 py-2'>Title: <Link to={`/${post.category}/${post.id}`}>{ post.title }</Link></div>
            <div  className='flex-1 text-grey-darker text-center bg-grey-light px-4 py-2'><Timestamp time={ post.timestamp / 1000 } format='full' /></div>
            <div className='flex-1 text-grey-darker text-right bg-grey-light px-4 py-2'>Category: { post.category }</div>
          </div>

          <div className='flex flex-row'>
            <div className='flex-1 text-grey-darker text-left bg-grey-light px-4 py-2'>Author: { post.author }</div>
            <div className='flex-1 text-grey-darker text-right bg-grey-light px-4 py-2'>Comments: { post.commentCount }</div>
          </div>

            <div>
            <img src={moodHappy} className='h-6 w-6 inline-block' alt='upVote' onClick={ () => this.votePost( post.id, 'upVote' ) }/>
              CurrentScore: { post.voteScore }
              <img src={moodSad} className='h-6 w-6 inline-block' alt='downVote' onClick={ () => this.votePost( post.id, 'downVote' ) }/>
            </div>
            <div className='flex flex-row'>
              <div className='flex-1 text-red-darker text-left bg-grey-light px-4 py-2'><button className='text-red-darker' onClick={ () => this.deletePost( post.id ) }>Remove Post</button></div>
              <div className='flex-1 text-green-darker text-right bg-grey-light px-4 py-2'><Link to={`/editpost/${post.id}`}><button className='text-green'>Edit Post</button></Link></div>
            </div>
          </div>
      ))}
    </div>
  </div>
  );
}

}

const mapStateToProps = ({posts, categories, sorting}) => ({
  posts, categories, sorting
})

export default connect(mapStateToProps, {loadPostsByCategory, loadCategories, deletePost, changeSorting, votePost})(MainPage)