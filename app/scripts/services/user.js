'use strict';

app.factory('User', function ($firebase, FIREBASE_URL, Auth, $rootScope) {
    var ref = new Firebase(FIREBASE_URL + '/users'),
    users = $firebase(ref),
    User = {
        create: function (authUser, username) {
            users[username] = {
                md5_hash: authUser.md5_hash,
                username: username,
                $priority: authUser.uid
              };
            users.$save(username).then(function () {
                setCurrentUser(username);
              });
          },
        findByUsername: function (username) {
            if (username) {
              return users.$child(username);
            }
          },
        getCurrent: function () {
            return $rootScope.currentUser;
          },
        signedIn: function () {
            return $rootScope.currentUser !== undefined;
          }
      };

    function setCurrentUser (username) {
        $rootScope.currentUser = User.findByUsername(username.uid);
      }

    $rootScope.$on('$firebaseSimpleLogin:login', function (e, authUser) {
        setCurrentUser(authUser);
      });

    $rootScope.$on('$firebaseSimpleLogin:logout', function() {
        delete $rootScope.currentUser;
      });
    return User;
  });
