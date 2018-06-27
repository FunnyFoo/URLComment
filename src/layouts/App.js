import React, { Component } from 'react'
import './App.css'

import { queryTabs } from '../api/chrome'
import { getLocation } from '../api/window'
import { writePost, writeComment, getCommentsQuery } from '../api/firebase'

import CommentsList from '../components/Comment/CommentsList'
import CommentField from '../components/Field/CommentField'

class App extends Component {
  state = {
    location: null,
    title: '',
    postId: '',
    total: 0,
    comments: []
  }

  getCurrentTabInfo = () => {
    return queryTabs({ active: true, lastFocusedWindow: true }).then(tabs => {
      const focusedTab = tabs[0]
      const loc = getLocation(focusedTab.url)

      return { location: loc, title: focusedTab.title }
    })
  }

  getPost = (title, url) => {
    if (!url) return Promise.reject('The URL is not existed.')

    return writePost(title, url)
  }

  subscribeComments(postId) {
    this.unsubscribeComments = getCommentsQuery(postId).onSnapshot(snapshot => {
      const data = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
        submitted: doc.data().submitted.toDate()
      }))
      this.setState({
        postId,
        comments: data,
        total: snapshot.size
      })
      // snapshot.forEach(doc => {
      //   console.log(doc, doc.data())
      // })
      // snapshot.docChanges().forEach(change => {
      //   console.log(change, change.doc.data())
      // })
    })
  }

  handleSubmit = text => {
    if (!this.state.postId) return
    writeComment(text, this.state.postId)
  }

  componentDidMount() {
    this.getCurrentTabInfo()
      .then(res => {
        const { origin } = res.location
        this.setState({ title: res.title, location: res.location })
        return this.getPost(res.title, origin)
      })
      .then(post => {
        if (!post) return
        this.subscribeComments(post.id)
      })
  }

  render() {
    const { location, title, total, comments } = this.state
    const { origin = '' } = location || {}
    return (
      <div className="App">
        <header className="url">
          <div className="icon">
            <label>URL: </label>
            <input type="text" required readOnly value={origin} />
          </div>
          <div className="title">
            <div className="text">{title}</div>
            <div className="total">Total: {total}</div>
          </div>
        </header>
        <div className="wrapper">
          <CommentsList items={comments} />
        </div>
        <CommentField
          disabled={!this.state.postId}
          onSubmit={this.handleSubmit}
        />
      </div>
    )
  }
}

export default App
