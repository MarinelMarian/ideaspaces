'use strict';

angular.module('sbAdminApp')
  .service('UserService', function($http) {
    var url = "http://localhost:8080/userService"

    this.signup = function(firstName, lastName, email, password) {
      return $http({
        method: 'GET',
        url: url,
        data: {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password
        }
      });
    }
  });
