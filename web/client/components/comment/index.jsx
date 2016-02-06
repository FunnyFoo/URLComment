import React from 'react'
import { afterCreated } from '/libs/utils'

const Comment = ({ author, submitted, body }) => (
  <li className="Comment">
    <h4>
      <span className="Comment-author">{author}</span>
      <span className="Comment-date">{', ' + afterCreated(submitted) + ' ago'}</span>
    </h4>
    <p className="Comment-body">{body}</p>
  </li>
)

export default Comment
