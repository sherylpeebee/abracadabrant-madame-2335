'use strict()';

angular.module('GriftrApp')
.controller('NavCtrl', function($scope, $http, $rootScope, $state) {
  console.log('nav ctrl');
  $http.get("/getUserData").success(function(userData){
    console.log(userData);
    $rootScope.currentUser = userData;
  });
  $scope.goToProfile = function() {
    if ($rootScope.currentUser.owner) {
      console.log('owner');
      $state.go('info.owner');
    } else {
      console.log('traveller');
      $state.go('info.traveller');
    }
    
    console.log($rootScope.currentUser);
  }
});
