'use strict';

app.factory('Post', function ($firebase, FIREBASE_URL) {
    var ref = new Firebase(FIREBASE_URL + '/posts'),
        posts = $firebase(ref),
        Post = {
            all: posts,
            create: function (post) {
              return posts.$add(post);
            },
            find: function (postId) {
              return posts.$child(postId);
            },
            delete: function (postId) {
              return posts.$remove(postId);
            }
        };
    return Post;
});