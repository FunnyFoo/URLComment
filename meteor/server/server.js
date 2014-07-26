var samplePostsData = [{
    "user_id": 		"",		// get ID from twitter, facebook, or anonymous
    "name": 	"Anonymous",		// 
    "rate": {
        "0": "", 			// neutral comment
        "1": "", 			// positive comment
        "-1": ""			// negative comment
    },
    "comment": 	"",
    "date": 	"Sat Jul 19 2014",
    "url": 		"",
    "ip": 		"",
    "device": 	"",
    "public": 	true,	// public or not by boolean
    "counter": 	""		// times of view for the comment
}, {
    "date": "Sat Jul 19 2014",
    "name": "You",
    "comment": "wtf"
}];

var Posts = new Meteor.Collection('myBookPosts');

Meteor.startup(function() {
    // code to run on server at startup
    Meteor.publish('myBookPosts', function() {
    	return Posts.find();
	});
});