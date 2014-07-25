Meteor.publish('allPosts', function() {
    return Posts.find();
});