// Fixture data
if (Posts.find().count() === 0) {
  var now = new Date().getTime();

  // create two users
  var tomId = Meteor.users.insert({
    profile: { name: 'Tom Coleman' }
  });
  var tom = Meteor.users.findOne(tomId);
  var sachaId = Meteor.users.insert({
    profile: { name: 'Sacha Greif' }
  });
  var sacha = Meteor.users.findOne(sachaId);

  var telescopeId = Posts.insert({
    title: 'sachagreif.com',
    url: 'http://sachagreif.com',
    submitted: new Date(now - 7 * 3600 * 1000).getTime(),
    commentsCount: 2,
    upvoters: [],
    votes: 0
  });

  Comments.insert({
    postId: telescopeId,
    userId: tom._id,
    author: tom.profile.name,
    submitted: new Date(now - 5 * 3600 * 1000).getTime(),
    body: "Interesting project Sacha, can I get involved?"
  });

  Comments.insert({
    postId: telescopeId,
    userId: sacha._id,
    author: sacha.profile.name,
    submitted: new Date(now - 3 * 3600 * 1000).getTime(),
    body: "You sure can Tom!"
  });

  Posts.insert({
    title: 'www.meteor.com',
    url: 'https://www.meteor.com',
    submitted: new Date(now - 10 * 3600 * 1000).getTime(),
    commentsCount: 0,
    upvoters: [],
    votes: 0
  });

  Posts.insert({
    title: 'www.discovermeteor.com',
    url: 'https://www.discovermeteor.com',
    submitted: new Date(now - 12 * 3600 * 1000).getTime(),
    commentsCount: 0,
    upvoters: [],
    votes: 0
  });
};