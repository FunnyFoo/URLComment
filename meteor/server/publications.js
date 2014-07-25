Meteor.publish('allPosts', function() {
    return Posts.find();
});

Meteor.publish('somePosts', function() {
    return Posts.find({'author': 'Tom'});
});