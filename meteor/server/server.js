var samplePostsData = [{
	"user_id": "", // get ID from twitter, facebook, or anonymous
	"name": "Anonymous", // 
	"rate": {
		"0": "", // neutral comment
		"1": "", // positive comment
		"-1": "" // negative comment
	},
	"comment": "",
	"date": "Sat Jul 19 2014",
	"url": "",
	"ip": "",
	"device": "",
	"public": true, // public or not by boolean
	"counter": "" // times of view for the comment
}, {
	"date": "Sat Jul 19 2014",
	"name": "You",
	"comment": "wtf"
}];

Meteor.startup(function () {
	// code to run on server at startup
	Meteor.publish('myBookPosts', function () {
		return Posts.find();
	});
});

Meteor.methods({
	postComment: function (name, rate, comment, url, pub) {
		var post = {
			'name': name,
			'rate': rate,
			'comment': comment,
			'date': new Date().toDateString(),
			'url': url,
			'ip': '',
			'device': '',
			'public': pub
		}

		post._id = Posts.insert(post);
	},
	getPosts: function() {
		return Posts.find().fetch();
		// Return an Array of the Posts collection
	}
});