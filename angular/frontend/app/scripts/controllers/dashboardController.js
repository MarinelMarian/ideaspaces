'use strict';

angular.module('sbAdminApp')
  .controller('DashboardCtrl', function(UserService) {

    var self = this;

    UserService.me().then(function(response) {
      self.me = response.data;
    });

});
