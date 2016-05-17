'use strict';

angular.module('sbAdminApp')
  .controller('SignupCtrl', function($scope, UserService) {

    this.signup = function(firstName, lastName, email, password) {
      UserService.signup(firstName, lastName, email, password)
        .then(function successCallback(response) {
          console.log('success');
        }, function errorCallback(response) {
          console.log('error');
        });
    }

});
