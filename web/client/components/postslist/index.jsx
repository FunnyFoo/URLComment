import React from 'react'
import Post from '../post/index.jsx'

const PostsList = ({ posts }) => (
  <div>
    {posts.map( p =>
      <Post {...p} />
    )}
  </div>
)

export default PostsList
