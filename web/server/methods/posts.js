import { Posts } from '/libs/collections'
import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'

const validatePost = function(post) {
  const errors = {}
  if (!post.title) errors.title = "Please fill in a headline"
  if (!post.url) errors.url = "Please fill in a URL"

  return errors
}

export default function () {
  Meteor.methods({
    'posts.create'(title, url) {
      check(Meteor.userId(), String)
      check(title, String)
      check(url, String)

      const errors = validatePost({ title, url })
      if (errors.title || errors.url) throw new Meteor.Error('invalid-post', 'You must set a title and URL for your post')

      const postWithSameUrl = Posts.findOne({ url })
      if (postWithSameUrl) {
        return {
          postExists: true,
          _id: postWithSameUrl._id
        }
      }

      const user = Meteor.user()
      const post = {
        title,
        url,
        userId: user._id,
        author: user.username,
        submitted: new Date().getTime(),
        commentsCount: 0,
        upvoters: [],
        votes: 0
      }

      const postId = Posts.insert(post)
      return {
        _id: postId
      }
    },
    'posts.upvote'(postId) {
      check(this.userId, String)
      check(postId, String)
      const affectedPost = Posts.update({
        _id: postId,
        upvoters: { $ne: this.userId }
      }, {
        $addToSet: { upvoters: this.userId },
        $inc: { votes: 1 }
      })

      if (!affectedPost) throw new Meteor.Error('invalid', "You weren't able to upvote that post")
    },
    'posts.check'(title, url) {
      check(title, String)
      check(url, String)

      let post = Posts.findOne({ title })
      if (!post) {
        post = {
          title,
          url,
          submitted: new Date().getTime(),
          commentsCount: 0,
          votes: 0
        }

        post._id = Posts.insert(post)
      }

      return post._id
    }
  })
}
