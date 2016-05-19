'use strict'
angular.module('sbAdminApp')
  .controller('DashboardCtrl', function(UserService, $state) {

    var self = this;

    UserService.me().then(function(response) {
      self.me = response.data;
    });

    this.logout = function() {
      localStorage.removeItem('token');
      $state.go('login')
    }

    this.ideas = [{title: "Title 1"},{title: "Title 1"},{title: "Title 1"}]

    this.addIdea = function(title) {
      this.ideas.push({title: title});
    }

    this.deleteIdea = function(idea) {

    }

});
