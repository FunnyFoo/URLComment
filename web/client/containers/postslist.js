import PostsList from '../components/postslist/index.jsx'
import { useDeps } from 'react-simple-di'
import { composeWithTracker, composeAll } from 'react-komposer'

export const composer = ({ context }, onData) => {
  const { Meteor, Collections } = context()
  const posts = Collections.Posts.find().fetch()

  onData(null, { posts })
}

export default composeAll(
  composeWithTracker(composer),
  useDeps()
)(PostsList)
