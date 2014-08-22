Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() {
    return Meteor.subscribe('myBookPosts');
  }
});

Router.map(function() {
  this.route('home', {path: '/'});
  this.route('blog', {path: '/blog'})
});

Router.onBeforeAction('loading');