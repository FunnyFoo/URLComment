import Post from '../components/post/index.jsx'
import { useDeps } from 'react-simple-di'
import { composeWithTracker, composeAll } from 'react-komposer'

export const composer = ({ context, postId }, onData) => {
  const { Meteor, Collections, Tracker } = context()

  const post = Collections.Posts.findOne(postId)
  onData(null, { ...post, postId })
}

export default composeAll(
  composeWithTracker(composer),
  useDeps()
)(Post)
