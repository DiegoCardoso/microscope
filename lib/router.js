Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    waitOn: () =>  Meteor.subscribe('posts')
});

Router.map(function () {
    this.route('/', {name: 'postsList'});

    this.route('posts/:_id', {
        name: 'postPage',
        data: () => Posts.findOne(this.params._id)
    });
});