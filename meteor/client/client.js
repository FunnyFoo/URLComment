Meteor.subscribe('myBookPosts');
var Posts = new Meteor.Collection('myBookPosts');
var _deps = new Deps.Dependency;
var searchCriteria = {};
var search_query = "";

Template.main.helpers({
    "posts": function() {
        _deps.depend();
        return Posts.find(searchCriteria);
    },
    "webName": document.URL
});

Template.main.events({
    "submit form": function(e) {
        e.preventDefault();
        var post = {
            "user_id": "Anonymous",
            "name": $(e.target).find("[name=name]").val(),
            "rate": {
                "0": "",
                "1": "",
                "-1": ""
            },
            "comment": $(e.target).find("[name=comment]").val(),
            "date": new Date().toDateString(),
            "url": $(e.target).find("[name=url]").val(),
            "ip": "",
            "device": "",
            "public": true
        };
            
        post._id = Posts.insert(post);
        $(e.target).find("[name=name]").val("");
        $(e.target).find("[name=comment]").val("");
    },
    "click #url-submit": function(e) {
        e.preventDefault();
        
        search_query = $('#url-filter').val();
        if (search_query !== '')
            searchCriteria = {'url': search_query};
        else
            searchCriteria = {};
        _deps.changed();
        console.log('search_query: ' + search_query + '\nsearchCriteria: ' + searchCriteria);
    }
});