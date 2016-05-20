'use strict';

angular.module('sbAdminApp')
  .service('IdeaService', function($http, jwtHelper) {
    //var url = "/ideas";
    var url = "http://localhost:8000";

    var transformRequest = function(obj) {
        var str = [];
        for(var p in obj)
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
    };

    this.getIdeas = function() {
      return $http({
        method: 'GET',
        url: url
      });
    };

  });
