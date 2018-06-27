import React from 'react'
import './CommentsList.css'

import Comment from './Comment'

class CommentsList extends React.Component {
  scrollToBottom = () => {
    this.listEnd.scrollIntoView({ behavior: 'smooth' })
  }

  componentDidMount() {
    this.scrollToBottom()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.items.length !== this.props.items.length) {
      this.scrollToBottom()
    }
  }

  render() {
    const { items } = this.props

    return (
      <div className="comments-list">
        {items.map((item, idx) => <Comment key={idx} {...item} />)}
        <div ref={ref => (this.listEnd = ref)} className="list-end" />
      </div>
    )
  }
}

CommentsList.defaultProps = {
  items: []
}

export default CommentsList
