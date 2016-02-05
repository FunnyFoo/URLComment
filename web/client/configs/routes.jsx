import React from 'react'
import { injectDeps } from 'react-simple-di'
import { FlowRouter } from 'meteor/kadira:flow-router'
import { mount } from 'react-mounter'

import MainLayout from '../components/layout/index.jsx'

export default function (context, actions) {
  const MainLayoutCtx = injectDeps(context, actions)(MainLayout)

  FlowRouter.route('/', {
    name: 'home',
    action() {
      mount(MainLayoutCtx, { content: () => null })
    }
  })

  FlowRouter.route('/posts/:postId', {
    name: 'post',
    action() {
      mount(MainLayoutCtx, { content: () => null })
    }
  })
}
