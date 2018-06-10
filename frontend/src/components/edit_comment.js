import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadComment, saveComment } from '../actions'

class EditComment extends Component {
  state = {
    id: '',
    author: '',
    content: ''
  };

  componentDidMount() {
    this.props.loadComment(this.props.match.params.comment_id).then(() => {
      const { author, body } = this.props.comments.comments[0];
      this.setState({
        id: this.props.match.params.comment_id,
        author: author,
        content: body
      });
    });
  }

  handleInputChange = e => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { id, content, author } = this.state;
    const data = {
      id: id,
      body: content,
      author: author
    };
    this.props.saveComment(data, data.id);
    this.props.history.goBack();
  };

  render() {
    return (
      <div className='container mx-auto bg-grey m-6 p-6 rounded shadow-lg'>
      <div>Comment Edit Page</div>
      <div><button onClick ={ () => {this.props.history.goBack()}}>Back</button></div>
      <div className='flex-1 text-grey-darker text-center bg-grey-light px-4 py-2 m-2'>
      <div className='flex-1 text-grey-darker text-center bg-grey-light px-4 py-2 m-2'>
        <form className='w-full max-w-md' onSubmit={ this.handleSubmit }>


          <div className='flex flex-wrap -mx-3 mb-6'>
            <div className='w-full px-3'>
              <label className='block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2' htmlFor='grid-author'>
                Author
              </label>
              <input type='text' name='author'  id='grid-author' value={this.state.author} onChange={this.handleInputChange} className='block appearance-none w-full bg-white border border-grey-light hover:border-grey px-4 py-2 pr-8 rounded shadow leading-tight'/>
            </div>
          </div>

          <div className='flex flex-wrap -mx-3 mb-6'>
            <div className='w-full px-3'>
              <label className='block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2' htmlFor='grid-content'>
                Comment
              </label>
              <textarea  name='content' id='grid-content' value={this.state.content}  onChange={this.handleInputChange} className='block appearance-none w-full bg-white border border-grey-light hover:border-grey px-4 py-2 pr-8 rounded shadow leading-tight'/>
            </div>
          </div>
          <button>Save Comment</button>
        </form>
      </div>
      </div>
      </div>
    );
  }

}

const mapStateToProps = ({ comments }) => ({
  comments,
});

const mapDispatchToProps = dispatch => ({
  loadComment: commentId => dispatch(loadComment(commentId)),
  saveComment: (comment, commentId) => dispatch(saveComment(comment, commentId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditComment);