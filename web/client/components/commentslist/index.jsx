import React from 'react'
import Comment from '../comment/index.jsx'

const CommentsList = ({ comments }) => (
  <ul className="CommentsList">
    {comments.map( c =>
      <Comment key={c._id} {...c} />
    )}
  </ul>
)

export default CommentsList
