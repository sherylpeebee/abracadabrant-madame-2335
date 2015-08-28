'use strict()';

angular.module('GriftrApp')
.controller('TravellersCtrl', function($scope, $http, $rootScope, $stateParams, $state) {
  // var param = $stateParams;
  // $rootScope.paramCheck = Object.keys(param).length;
  $rootScope.currentState = $state.current.name;
  $http.get("/travellers").success(function(travellers){
    // console.log(listings);
    $scope.travellers = travellers;
  });
});
