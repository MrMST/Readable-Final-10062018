import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { loadPost, loadCategories, savePost } from '../actions'

class EditPost extends Component {
  state = {
    id: '',
    title: '',
    author: '',
    body: '',
    category: ''
  };

  componentDidMount() {
    this.props.loadPost(this.props.match.params.post_id).then(() => {
      const { id, title, author, body, category } = this.props.posts.posts[0];
      this.setState({
        id: id,
        title: title,
        author: author,
        body: body,
        category: category
      });
    });
    this.props.loadCategories();
  }

  handleInputChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  setCategory = (event) => {
    this.setState({ category: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      category: this.state.category,
      id: this.state.id,
      title: this.state.title,
      author: this.state.author,
      body: this.state.body
    };
    this.props.savePost(data, data.id);
    this.props.history.push('/');
  };

  render() {
    const { posts}  = this.props.posts;
    const { categories} = this.props

    return (
      <div className='container mx-auto bg-grey m-6 p-6 rounded shadow-lg'>
      <div>Post Edit Page</div>
      <div><Link to={'/'} key='back'>Back</Link></div>

        {
          posts &&
          posts.length > 0 &&
          Object.keys(posts[0]).length > 0 &&
          !posts[0].error ? (<div>
            {
              posts.filter( post => !post.deleted).map(post => (

                <div key={post.id} className='flex-1 text-grey-darker text-center bg-grey-light px-4 py-2 m-2'>
                    <form className='w-full max-w-md' onSubmit={ this.handleSubmit }>

                    <div className='flex flex-wrap -mx-3 mb-6'>
                      <div className='w-full px-3'>
                        <label className='block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2' htmlFor='grid-select-category'>
                          Category
                        </label>
                        <select className='block appearance-none w-full bg-white border border-grey-light hover:border-grey px-4 py-2 pr-8 rounded shadow leading-tight' id='grid-select-category' name='category' value={this.state.category} onChange={this.setCategory}>
                          { categories && categories.length && categories.map( category => (
                              <option key={ category.name } value={ category.name }>{ category.name }</option>
                          ))}
                          </select>
                      </div>
                    </div>

                    <div className='flex flex-wrap -mx-3 mb-6'>
                      <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
                        <label className='block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2' htmlFor='grid-author'>
                          Author
                        </label>
                        <input name='author' value={this.state.author} onChange={this.handleInputChange} className='appearance-none block w-full bg-white text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3 leading-tight' id='grid-author' type='text' placeholder='Author'/>
                      </div>
                      <div className='w-full md:w-1/2 px-3'>
                        <label className='block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2' htmlFor='grid-title'>
                          Title
                        </label>
                        <input name='title' value={this.state.title} onChange={this.handleInputChange} className='appearance-none block w-full bg-white text-grey-darker border border-grey-lighter rounded py-3 px-4 leading-tight' id='grid-title' type='text' placeholder='Title'/>
                      </div>
                    </div>

                    <div className='flex flex-wrap -mx-3 mb-6'>
                      <div className='w-full px-3'>
                        <label className='block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2' htmlFor='grid-content-body'>
                          Content
                        </label>
                        <textarea className='block appearance-none w-full bg-white border border-grey-light hover:border-grey px-4 py-2 pr-8 rounded shadow leading-tight' name='body' id='grid-content-body' value={this.state.body}  onChange={this.handleInputChange}/>
                      </div>
                    </div>
                    <button>Save Post</button>
                    </form>
                </div>

              ))
            }
            </div>) : (<div>Post not found! 404 <Link to={'/'} key='back'>Back</Link></div>)
        }
      </div>

    );
  }

}

const mapStateToProps = ({ posts, categories }) => ({
  posts,
  categories
});

const mapDispatchToProps = dispatch => ({
  loadPost: postId => dispatch(loadPost(postId)),
  loadCategories: () => dispatch(loadCategories()),
  savePost: (post, postId) => dispatch(savePost(post, postId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditPost);