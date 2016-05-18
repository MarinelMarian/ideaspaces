'use strict';

angular.module('sbAdminApp')
  .service('UserService', function($http) {
    var url = "http://localhost:8080/user"

    var transformRequest = function(obj) {
        var str = [];
        for(var p in obj)
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
    };

    this.login = function(email, password) {
      return $http({
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        url: url + "/login",
        transformRequest: transformRequest,
        data: {
          email: email,
          password: password
        }
      }).then(function(response) {
        console.log(response)
      });
    }

    this.signup = function(firstName, lastName, email, password) {
      return $http({
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        url: url + "/register",
        transformRequest: transformRequest,
        data: {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password
        }
      });
    }
  });
