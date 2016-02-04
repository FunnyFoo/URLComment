import { Posts, Comments } from '/libs/collections'
import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'

Meteor.methods({
  'comments.insert'(postId, body) {
    check(this.userId, String)
    check(postId, String)
    check(body, String)

    const user = Meteor.user()
    const post = Posts.findOne(postId)

    if (!post) throw new Meteor.Error('invalid-comment', 'You must comment on a post')

    const comment = {
      postId,
      body,
      userId: user._id,
      author: user.profile.name,
      submitted: new Date
    }

    Posts.update(comment.postId, { $inc: { commentsCount: 1 } })
    comment._id = Comments.insert(comment)

    return comment._id
  },
  commentByAnonymous(postId, body) {
    check(postId, String)
    check(body, String)

    const user = {
      _id: "anonymous",
      name: "Anonymous"
    }

    const post = Posts.findOne(postId)

    if (!post) throw new Meteor.Error('invalid-comment', 'You must comment on a post')

    const comment = {
      postId,
      body,
      userId: user._id,
      author: user.profile.name,
      submitted: new Date
    }

    Posts.update(comment.postId, { $inc: { commentsCount: 1 } })
    comment._id = Comments.insert(comment)
    return comment._id
  }
})
