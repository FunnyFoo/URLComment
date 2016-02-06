import CommentsList from '../components/commentslist/index.jsx'
import { useDeps } from 'react-simple-di'
import { composeWithTracker, composeAll } from 'react-komposer'

export const composer = ({ context, postId }, onData) => {
  const { Meteor, Collections } = context()
  const comments = Collections.Comments.find({ postId }, { sort: { createAt: -1 } }).fetch()
  onData(null, { comments })
}

export default composeAll(
  composeWithTracker(composer),
  useDeps()
)(CommentsList)
