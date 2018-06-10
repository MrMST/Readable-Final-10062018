import React, { Component } from 'react'
import { connect } from 'react-redux'
import uuidv1 from 'uuid/v1'
import serializeForm from 'form-serialize'
import { Link } from 'react-router-dom'
import { addPost, loadCategories} from '../actions'

class AddPost extends Component {
  state = {
    category: 'react'
  }

  componentDidMount() {
    this.props.loadCategories();
  }

  setCategory = (event) => {
    this.setState({ category: event.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const data = serializeForm(e.target, { hash: true })
    this.props.addPost(data);
    this.props.history.push('/');
  }

  render() {
    const categories = this.props.categories
    return (
      <div className='container mx-auto bg-grey m-6 p-6 rounded shadow-lg'>
      <div>Post Add Page</div>
      <div><Link to={'/'} key='back'>Back</Link></div>
      <div className='flex-1 text-grey-darker text-center bg-grey-light px-4 py-2 m-2'>
        <form className='w-full max-w-md' onSubmit={ this.handleSubmit }>
          <input type='hidden'  name='id' value={uuidv1()}/>
          <input type='hidden'  name='timestamp' value={Date.now()}/>
          <input type='hidden'  name='deleted' value='false'/>
          <input type='hidden'  name='voteScore' value='1'/>
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
              <input id='grid-author' type='text' placeholder='Author' name='author' className='appearance-none block w-full bg-white text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3 leading-tight'/>
            </div>
            <div className='w-full md:w-1/2 px-3'>
              <label className='block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2' htmlFor='grid-title'>
                Title
              </label>
              <input id='grid-title' type='text' placeholder='Title' name='title' className='appearance-none block w-full bg-white text-grey-darker border border-grey-lighter rounded py-3 px-4 leading-tight'/>
            </div>
          </div>
          <div className='flex flex-wrap -mx-3 mb-6'>
            <div className='w-full px-3'>
              <label className='block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2' htmlFor='grid-content-body'>
                Content
              </label>
              <textarea name='body' id='grid-content-body' value={this.state.body} className='block appearance-none w-full bg-white border border-grey-light hover:border-grey px-4 py-2 pr-8 rounded shadow leading-tight'/>
            </div>
          </div>
          <button>Save Post</button>
        </form>
      </div>
      </div>
    );
  }
}

const mapStateToProps = ({ categories }) => ({
  categories
});

export default connect(mapStateToProps, { addPost, loadCategories })(AddPost);
