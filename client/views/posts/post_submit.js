Template.postSubmit.events({
    'submit form' (e) {
        var post = {
            url: e.target.url.value,
            title: e.target.title.value,
            message: e.target.message.value
        };

        e.preventDefault();


        Meteor.call('post', post, function (err, id) {
            if (err) {
                return alert(err.reason);
            }

            post._id = id;

            return Router.go('postPage', post);
        });
    }
});