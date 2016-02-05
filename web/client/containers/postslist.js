import { useDeps } from 'react-simple-di'
import { composeWithTracker, composeAll } from 'react-komposer'

export const composer = ({ context }, onData) => {

}

export default composeAll(
  composeWithTracker(composer),
  useDeps()
)
