import Api from '../api/Api';
import * as types from './actionTypes';

export function loadPostsSuccess(posts) {
  return {
    type: types.LOAD_POSTS_SUCCESS,
    posts
  };
}

export function loadPosts() {
  return function(dispatch) {
    return Api.getPosts().then(posts => {
      dispatch(loadPostsSuccess(posts));
    }).catch(error => {
      throw(error);
    });
  };
}

export function loadPostsByCategory(category) {
  return function(dispatch) {
    return Api.getPostsByCategory(category).then(posts => {
      dispatch(loadPostsSuccess(posts));
    }).catch(error => {
      throw(error);
    });
  };
}

export function loadPostSuccess(posts) {
  return {
    type: types.LOAD_POST_SUCCESS,
    posts
  };
}

export function loadPost(id) {
  return function(dispatch) {
    return Api.getPost(id).then(post => {
      dispatch(loadPostSuccess(post));
    }).catch(error => {
      throw(error);
    });
  };
}

export function addPostSuccess(post) {
  return {
    type: types.ADD_POST_SUCCESS,
    post
  }
};

export function addPost(post) {
  return function(dispatch) {
    Api.addPost(post).then(post => {
      dispatch(addPostSuccess(post));
    }).catch(error => {
      throw(error);
    });
  };
}

export function deletePostSuccess(postId) {
  return {
    type: types.DELETE_POST_SUCCESS,
    postId
  }
};

export function deletePost(postId) {
  return function(dispatch) {
    Api.deletePost(postId).then(post => {
      dispatch(deletePostSuccess(postId));
    }).catch(error => {
      throw(error);
    });
  };
}

export function changeSorting(sorting) {
  return {
    type: types.CHANGE_SORTING_SUCCESS,
    sorting
  }
}

export function votePostSuccess(post) {
  return {
      type: types.VOTE_POST_SUCCESS,
      post
    }
}

export function votePost(id, value) {
  return function(dispatch) {
    return Api.votePost(id, value).then(post => {
      dispatch(votePostSuccess(post));
    }).catch(error => {
      throw(error);
    });
  };
}

export function loadCategoriesSuccess(categories) {
  return  {
    type: types.LOAD_CATEGORIES_SUCCESS,
    categories
  }
};

export function loadCategories() {
  return function(dispatch) {
    return Api.getCategories().then(categories => {
      dispatch(loadCategoriesSuccess(categories));
    }).catch(error => {
      throw(error);
    });
  };
};

export function loadCommentsSuccess(comments) {
  return  {
    type: types.LOAD_COMMENTS_SUCCESS,
    comments
  };
};

export function loadComments(postId) {
  return function (dispatch) {
    return Api.getComments(postId).then(comments => {
      dispatch(loadCommentsSuccess(comments));
    }).catch(error => {
      throw(error);
    });
  }
};

export function loadCommentSuccess(comments) {
  return {
    type: types.LOAD_COMMENT_SUCCESS,
    comments
  };
};

export function loadComment(commentId) {
  return function(dispatch) {
    return Api.getComment(commentId).then(comment => {
      dispatch(loadCommentSuccess(comment));
    }).catch(error => {
      throw(error);
    });
  };
}

export function addCommentSuccess(comment) {
  return {
    type: types.ADD_COMMENT_SUCCESS,
    comment
  };
};


export function addComment(comment) {
  return function (dispatch) {
    Api.addComment(comment).then(comment => {
      dispatch(addCommentSuccess(comment));
    }).catch(error => {
      throw(error);
    });
  }
};

export function deleteCommentSuccess(comment) {
  return {
    type: types.DELETE_COMMENT_SUCCESS,
    comment
  };
};


export function deleteComment(comment) {
  return function (dispatch) {
    Api.deleteComment(comment).then(comment => {
      dispatch(deleteCommentSuccess(comment));
    }).catch(error => {
      throw(error);
    });
  }
};

export function voteCommentSuccess(commentId, option) {
  return {
    type: types.VOTE_COMMENT_SUCCESS,
    commentId
  };
};






export function voteComment(commentId, option) {
  return function(dispatch) {
    Api.voteComment(commentId, option).then(comment => {
      dispatch(voteCommentSuccess(comment));
    }).catch(error => {
      throw(error);
    });
  }
};





export function savePostSuccess(post, postId) {
  return {
    type: types.SAVE_POST_SUCCESS,
    post,
    postId
  }
};

export function savePost(post, postId) {
  return function (dispatch) {
    Api.savePost(post, postId).then(post => {
      dispatch(savePostSuccess(post));
    }).catch(error => {
      throw(error);
    });
  }
};

export function saveCommentSuccess(comment, commentId) {
  return {
    type: types.SAVE_COMMENT_SUCCESS,
    comment,
    commentId
  }
};

export function saveComment(comment, commentId) {
  return function(dispatch) {
    Api.saveComment(comment, commentId).then(comment => {
      dispatch(saveCommentSuccess(comment));
    }).catch(error => {
      throw(error);
    });
  }
};