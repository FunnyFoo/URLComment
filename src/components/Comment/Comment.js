import React from 'react'
import format from 'date-fns/format'
import './Comment.css'

const Comment = props => (
  <div className="comment">
    <pre className="content">{props.body}</pre>
    <div className="info">
      <span>posted on </span>
      <span className="submitted">
        {format(props.submitted, 'yyyy-MM-dd HH:mm:ss')}
      </span>
    </div>
  </div>
)

export default Comment
