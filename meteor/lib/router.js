Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() {
    return Meteor.subscribe('myBookPosts');
  }
});

Router.map(function() {
  this.route('home', {path: '/'});
  this.route('about', {path: '/about'});
  this.route('blog', {path: '/blog'});
  this.route('products', {path: '/products'});
  this.route('contacts', {path: '/contacts'});
});

Router.onBeforeAction('loading');