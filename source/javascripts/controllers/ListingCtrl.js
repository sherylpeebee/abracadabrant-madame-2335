'use strict()';

angular.module('GriftrApp')
.controller('ListingCtrl', function($scope, $http, $rootScope, $location, Listing, $stateParams) {
  var param = $stateParams;
  $rootScope.paramCheck = Object.keys(param).length;

    // console.log(house);
    $scope.params = $stateParams;
    Listing.getListing($stateParams.houseId)
    .then(function(data){
      console.log(data.data);
      $scope.houseInfo = data.data;
    })
    .catch(function(error){
      console.log(error);
    });

});
