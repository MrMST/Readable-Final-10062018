import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import MainPage from './components/main_page'
import AddPost from './components/add_post'
import ShowPost from './components/show_post'
import EditPost from './components/edit_post'
import EditComment from './components/edit_comment'
import CategoryPage from './components/category_page'

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={MainPage} />
        <Route exact path='/addpost' component={AddPost} />
        <Route exact path='/:category/' component={CategoryPage} />
        <Route exact path='/editpost/:post_id' component={EditPost} />
        <Route exact path='/editcomment/:comment_id' component={EditComment} />
        <Route exact path='/:category/:post_id' component={ShowPost} />
      </Switch>
    );
  }
}

export default App;
