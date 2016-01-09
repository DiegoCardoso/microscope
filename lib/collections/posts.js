Posts = new Meteor.Collection('posts');

Meteor.methods({
    post (postAttributes) {
        const user = Meteor.user(),
            postWithSameLink = Posts.findOne({url: postAttributes.url});

        if (!user)
            throw new Meteor.Error(401, 'You need to login to post new stories.');

        if(!postAttributes.title)
            throw new Meteor.Error(422, 'Please fill in a headline');

        if (postAttributes.url && postWithSameLink && postAttributes._id !== postWithSameLink._id)
            throw new Meteor.Error(302, 'This link has already been posted', postWithSameLink._id);

        let post = _.extend({}, _.pick(postAttributes, 'url', 'title', 'message'), {
            userId: user._id,
            author: user.username,
            submitted: new Date().getTime()
        });


        if (!postWithSameLink)
            return Posts.insert(post);

        Posts.update(postAttributes._id, { $set: post});

        return postAttributes._id;
    },

    postRemove (_id) {
        return Posts.remove({ _id});
    }
});