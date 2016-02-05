import React from 'react'
import Post from '../post/index.jsx'

const PostsList = ({ posts }) => (
  <div className="PostsList">
    {posts.map( p =>
      <Post key={p._id} {...p} postId={p._id} />
    )}
  </div>
)

export default PostsList
