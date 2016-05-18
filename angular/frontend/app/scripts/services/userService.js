'use strict';

angular.module('sbAdminApp')
  .service('UserService', function($http) {
    var url = "http://localhost:8080"

    this.signup = function(firstName, lastName, email, password) {
      return $http({
        method: 'POST',
        url: url + "/registerUser",
        data: {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password
        }
      });
    }
  });
