Template.postSubmit.events({
    'submit form' (e) {
        var post = {
            url: e.target.url.value,
            title: e.target.title.value,
            message: e.target.message.value
        };

        post._id = Posts.insert(post);

        e.preventDefault();

        return Router.go('postPage', post);
    }
});