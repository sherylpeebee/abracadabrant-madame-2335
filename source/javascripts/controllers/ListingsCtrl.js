'use strict()';

angular.module('GriftrApp')
.controller('ListingsCtrl', function($scope, $http, $rootScope, $location, Listing, $stateParams, $state) {
  // var param = $stateParams;
  // $rootScope.paramCheck = Object.keys(param).length;
  $rootScope.currentState = $state.current.name;
  console.log('Listings ctrl');
  $http.get("/listings").success(function(houses){
    // console.log(listings);
    $scope.houses = houses;
  });
});
