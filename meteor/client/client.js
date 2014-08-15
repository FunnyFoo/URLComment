Meteor.subscribe('myBookPosts','Good');
var _deps = new Deps.Dependency;
var searchCriteria = {};
var search_query = "";

function uncollapsePage(e1, e2) {
	e1.classList.remove('collapsed');
	e2.classList.add('in');
}

function collapsePage(e1, e2) {
	e1.classList.add('collapsed');
	e2.classList.remove('in');
}

Template.main.helpers({
	"posts": function () {
		_deps.depend();
		return Posts.find(searchCriteria);
	},
	"webName": document.URL
});

Template.main.events({
	"submit form": function (e) {
		e.preventDefault();
		var name = $(e.target).find("[name=name]").val();
		var comment = $(e.target).find("[name=comment]").val();
		var url = $(e.target).find("[name=url]").val();
		Meteor.call('postComment', name, '0', comment, url, true);

		$(e.target).find("[name=name]").val("");
		$(e.target).find("[name=comment]").val("");
	},
	"click #url-submit": function (e) {
		e.preventDefault();

		search_query = $('#url-filter').val();
		if (search_query !== '')
			searchCriteria = {
				'url': search_query
			};
		else
			searchCriteria = {};
		collapsePage(document.getElementById('url-collapse'), document.getElementById('panel-element-393854'));
		uncollapsePage(document.getElementById('comment-collapse'), document.getElementById('panel-element-795158'));
		_deps.changed();
		console.log('search_query: ' + search_query + '\nsearchCriteria: ' + searchCriteria);
	}
});