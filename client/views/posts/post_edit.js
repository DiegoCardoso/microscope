Template.postEdit.events({
    'submit form' (e) {
        const   currentPostId = this._id,
                form = e.target,
                postProperties = {
                    url: form.url.value,
                    title: form.title.value,
                    _id: currentPostId
                };

        e.preventDefault();

        Meteor.call('post', postProperties, (error, id) => {
            if (error) {
                return alert(error.reason);
            }

            Router.go('postPage', {_id: currentPostId});
        });
    },

    'click .delete' (e) {
        e.preventDefault();

        if (confirm('Delete this post?')) {
            let currentPostId = this._id;
            Meteor.call('postRemove', currentPostId, (error, success) => {

                if (error) {
                    alert(error.reason);
                }

                Router.go('postsList');
            });
        }
    }
});