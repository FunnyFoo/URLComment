var Schema = {};

Schema.Post = new SimpleSchema({
  domain: {
    type: String,
    label: "Domain Name"
  },
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
  submitted: {  // ISO format
    type: String,
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
  submitted: {  // ISO format
    type: String,
    label: "Submitted Date"
  }
});

Posts.attachSchema(Schema.Post);
Comments.attachSchema(Schema.Comment);