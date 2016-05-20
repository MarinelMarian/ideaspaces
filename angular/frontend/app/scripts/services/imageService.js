'use strict';

angular.module('sbAdminApp')
  .service('ImageService', function($http, jwtHelper) {
    var url = "http://ideaspaces.ml/image";

    var transformRequest = function(obj) {
        var str = [];
        for(var p in obj)
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
    };

    this.saveImage = function(fileData) {
      return $http({
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        url: url,
        transformRequest: transformRequest,
        data: {
          file: fileData
        }
      }).then(function(response) {
        var result = { url: null };
        if(response.data) {
          result.url = response.data;
        }
        return result;
      });
    };
  });
