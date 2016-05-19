'use strict';

angular.module('sbAdminApp')
  .controller('SignupCtrl', function($scope, UserService, $state) {

    this.signup = function(firstName, lastName, email, password) {
      UserService.signup(firstName, lastName, email, password)
        .then(function successCallback(response) {
          $state.go('dashboard.home');
        }, function errorCallback(response) {
          swal({   title: "Error!",   text: "Could not register!",   type: "error",   confirmButtonText: "Not cool!" });
        });
    }

});
