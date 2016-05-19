'use strict';

angular.module('sbAdminApp')
  .controller('LoginCtrl', function($scope, UserService, $state) {

    this.login = function(email, password) {
      if (email && password) {
        UserService.login(email, password)
          .then(function successCallback(response) {
            $state.go('dashboard.home');
          }, function errorCallback(response) {
            swal({   title: "Error!",   text: "Could not login!",   type: "error",   confirmButtonText: "Not cool!" });
          });
      } else {
          swal({   title: "Please fill the form!",   type: "error",   confirmButtonText: "Fine!" });
      }

    }

});
