'use strict';

angular.module('sbAdminApp')
  .service('UserService', function($http, jwtHelper) {
    var url = "/user";
    var url = "http://localhost:8080/user";

    var transformRequest = function(obj) {
        var str = [];
        for(var p in obj)
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
    };

    this.me = function() {
      return $http({
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        url: url + "/me",
        transformRequest: transformRequest,
        data: {
          token: localStorage.getItem('token')
        }
      });
    }

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
        var tokenPayload = jwtHelper.decodeToken(response.data);
        localStorage.setItem('token', response.data);
        return tokenPayload
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
