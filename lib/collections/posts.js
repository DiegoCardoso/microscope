Posts = new Meteor.Collection('posts');

Posts.allow({
    insert (userId, doc) {
        return !!userId;
    }
});