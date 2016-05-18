'use strict';

angular.module('sbAdminApp')
  .controller('LoginCtrl', function($scope, UserService) {

    this.login = function(email, password) {
      UserService.login(email, password)
        .then(function successCallback(response) {
          console.log('success login');
        }, function errorCallback(response) {
          console.log('error login');
        });
    }

});
