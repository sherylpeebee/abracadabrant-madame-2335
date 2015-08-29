'use strict()';

angular.module('GriftrApp')
.controller('NavCtrl', function($scope, $http, $rootScope, $state, $stateParams) {
  // var param = $stateParams;
  // $rootScope.paramCheck = Object.keys(param).length;
  $rootScope.currentState = $state.current.name;
  console.log('nav ctrl');
  $http.get("/getUserData").success(function(userData){
    console.log(userData);
    $rootScope.currentUser = userData;
  });
  $scope.goToProfile = function() {
    if ($rootScope.currentUser.owner) {
      console.log('owner: ', $rootScope.currentUser.owner);
      $state.go('info.owner');
    } else {
      console.log('traveller: ', $rootScope.currentUser.traveller);
      $state.go('info.traveller');
    }
    console.log($rootScope.currentUser);
  };
});
