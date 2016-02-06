import React from 'react'
import { injectDeps } from 'react-simple-di'
import { FlowRouter } from 'meteor/kadira:flow-router'
import { mount } from 'react-mounter'

import MainLayout from '../components/layout/index.jsx'
import PostsList from '../containers/postslist'
import Post from '../containers/post'
import CommentsList from '../containers/commentslist'

export default function (context, actions) {
  const MainLayoutCtx = injectDeps(context, actions)(MainLayout)

  FlowRouter.route('/', {
    name: 'home',
    action() {
      mount(MainLayoutCtx, { content: () => <PostsList /> })
    }
  })

  FlowRouter.route('/posts/:postId', {
    name: 'post',
    action({ postId }) {
      mount(MainLayoutCtx, { content: () => (
        <div>
          <Post postId={postId} />
          <CommentsList postId={postId} />
        </div>
      )})
    }
  })
}
