import React, { Component } from 'react'
import { afterCreated, pluralize } from '/libs/utils'

export default class Post extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { postId, title, url, submitted, votes, commentsCount } = this.props
    return (
      <div className="Post" {...this.getAttrs()}>
        <a className={`Post-upvote btn btn-default ${this.getUpvotedClass()}`} onClick>⬆</a>
        <div className="Post-content">
          <h3>
            <a href={url} target="_blank">{title}</a>
            <span>{this.getDomain(url)}</span>
          </h3>
          <p>
            {`${pluralize(votes, "Vote")}, ${afterCreated(submitted)}`}
            <a href={`/posts/${postId}`}>{pluralize(commentsCount, "comment")}</a>
          </p>
        </div>
        <a className="Post-discuss btn btn-default" href={`/posts/${postId}`}>Discuss</a>
      </div>
    )
  }

  getDomain(url) {
    var a = document.createElement('a')
    a.href = url
    return a.hostname
  }

  getUpvotedClass() {
    // Need to refactor
    const { userId, upvoters } = this.props
    if (userId && upvoters.includes(userId)) {
      return 'btn-primary upvotable'
    } else {
      return 'disabled'
    }
  }

  getAttrs() {
    // Need to refactor
    const post = Object.assign({}, this.props)
    const newPos = post._rank * 80
    const attrs = {}
    if (typeof post.position === 'undefined') {
      // attrs.className = 'Post invisible'
    } else {
      const delta = post.position - newPos
      attrs.style = { top: `${delta}px` }
      if (delta === 0) attrs.className = 'Post animate'
    }

    // Meteor.setTimeout(function () {
    //   Positions.upsert({postId: post._id}, {$set: {position: newPos}})
    // });

    return attrs
  }
}
