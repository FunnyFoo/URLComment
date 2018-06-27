import React from 'react'
import './CommentField.css'

class CommentField extends React.Component {
  handleKeyDown = event => {
    const code = event.keyCode || event.which

    if (code === 13 && !event.shiftKey) {
      event.preventDefault()
      if (event.target.value.length === 0) return
      this.props.onSubmit(event.target.value)
      event.target.value = ""
    }
  }

  renderCommentInput() {
    return (
      <textarea
        className="comment-input"
        placeholder="Leave a comment..."
        rows="3"
        disabled={this.props.disabled}
        onKeyDown={this.handleKeyDown}
      />
    )
  }

  render() {
    return (
      <div className="comment-field">
        <div className="input-wrap">
          {this.renderCommentInput()}
        </div>
      </div>
    )
  }
}

CommentField.defaultProps = {
  onSubmit: () => null,
  onSearch: () => null
}

export default CommentField
