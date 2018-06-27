import React from 'react'
import { ReactComponent as CommentIcon } from '../../assets/comment.svg'
import { ReactComponent as SearchIcon } from '../../assets/search.svg'
import './Toggle.css'

const Toggle = ({ value, onChange }) => {
  return (
    <div className="toggle">
      <input
        id="check"
        type="checkbox"
        value={value}
        onChange={onChange}
      />
      <label className="slider" htmlFor="check" />
      <CommentIcon className="svg-icon icon-comment" />
      <SearchIcon className="svg-icon icon-search" />
    </div>
  )
}

Toggle.defaultProps = {
  value: false,
  onChange: () => null
}

export default Toggle
