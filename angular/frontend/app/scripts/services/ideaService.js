'use strict';

angular.module('sbAdminApp')
  .service('IdeaService', function($http, jwtHelper) {
    var url = "/ideas";
    //var url = "http://localhost:8000/ideas";

    var transformRequest = function(obj) {
        var str = [];
        for(var p in obj)
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
    };

    this.getAllIdeas = function() {
      return $http({
        method: 'GET',
        url: url
      });
    };

    this.getMemberIdeas = function(member) {
      return $http({
        method: 'GET',
        url: url + "?member_id=" + member
      });
    };

    this.getOtherIdeas = function(member) {
      return $http({
        method: 'GET',
        url: url + "?exclude_member_id=" + member
      });
    };

    this.addIdea = function(idea) {
      return $http({
        method: 'POST',
        url: url,
        data: idea
      });
    };

    this.deleteIdea = function(id) {
      return $http({
        method: 'DELETE',
        url: url + "/" + id
      });
    };

  });
