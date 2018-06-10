import { combineReducers } from 'redux'
import * as types from '../actions/actionTypes'


function posts(state = { posts: [] }, action) {
  switch(action.type) {

    case types.LOAD_POSTS_SUCCESS:
      return {
          ...state,
          posts: action.posts
        };

    case types.LOAD_POST_SUCCESS:
      return {
        ...state,
        posts: [action.posts]
      };

    case types.DELETE_POST_SUCCESS:
      const remainingPosts = state.posts.filter(
        entry => entry.id !== action.postId
      );
      return {
        ...state,
        posts: remainingPosts
      };

    case types.VOTE_POST_SUCCESS:
      const refreshedPosts = state.posts.map(entry => {
        if (entry.id === action.post.id) {
          entry.voteScore = action.post.voteScore;
        }
        return entry;
      });
      return {
        ...state,
        posts: refreshedPosts
      };

      default:
        return state;
  }
}

function comments(state = { comments: []}, action) {
  switch (action.type) {

    case types.LOAD_COMMENTS_SUCCESS:
      return {
        ...state,
        comments: action.comments
      };

    case types.ADD_COMMENT_SUCCESS:
      return {
        ...state,
        comments: state.comments.concat(action.comment)
      };

    case types.DELETE_COMMENT_SUCCESS:
      const availableComments = state.comments.filter(
        entry => entry.id !== action.comment.id
      );

      return {
        ...state,
        comments: availableComments
      };

      case types.VOTE_COMMENT_SUCCESS:
      const updatedComments = state.comments.map(entry => {
        if (entry.id === action.commentId.id) {
          entry.voteScore = action.commentId.voteScore;
        }
        return entry;
      });
      return {
        ...state,
        comments: updatedComments
      };

      case types.LOAD_COMMENT_SUCCESS:
        return {
          ...state,
          comments: [action.comments]
        };

      case types.SAVE_COMMENT_SUCCESS:
        return {
          ...state,
          ...action.comment
        };

    default:
      return state;
  }
}

function categories(state = {}, action) {
  switch (action.type) {

    case types.LOAD_CATEGORIES_SUCCESS:
      return action.categories

    default:
      return state;
  }
}

function sorting(state = { sorting: 'timestamp' }, action) {
  switch (action.type) {

    case types.CHANGE_SORTING_SUCCESS:
      return {
        ...state,
        sorting: action.sorting.sorting
      };

      default:
        return state;
    }
}

export default combineReducers({
    posts,
    comments,
    categories,
    sorting
})