var Schema = {};

Schema.Post = new SimpleSchema({
  url: {
    type: String,
    label: "URL"
  },
  title: {
    type: String,
    label: "Title"
  },
  commentsCount: {
    type: Number
  },
  submitted: {
    type: Number,
    label: "Submitted Date"
  },
  votes: {
    type: Number,
    label: "Votes",
    min: 0
  }
});

Schema.Comment = new SimpleSchema({
  postId: {
    type: String,
    label: "Post ID"
  },
  userId: {
    type: String,
    label: "User ID"
  },
  author: {
    type: String,
    label: "Author"
  },
  body: {
    type: String,
    label: "Content"
  },
  submitted: {
    type: Number,
    label: "Submitted Date"
  }
});

Posts.attachSchema(Schema.Post);
Comments.attachSchema(Schema.Comment);