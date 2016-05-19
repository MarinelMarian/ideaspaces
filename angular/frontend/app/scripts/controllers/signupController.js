'use strict';

angular.module('sbAdminApp')
  .controller('SignupCtrl', function($scope, UserService, $state) {

    this.signup = function(firstName, lastName, email, password) {
      UserService.signup(firstName, lastName, email, password)
        .then(function successCallback(response) {
          if (email && password) {
            $state.go('dashboard.home');
          } else {
              swal({   title: "Please fill the form!",   type: "error",   confirmButtonText: "Fine!" });
          }
        }, function errorCallback(response) {
          swal({   title: "Could not register!",   type: "error",   confirmButtonText: "Not cool!" });
        });
    }

});
