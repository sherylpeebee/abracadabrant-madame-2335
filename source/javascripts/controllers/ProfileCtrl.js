'use strict()';

angular.module('GriftrApp')
.controller('ProfileCtrl', function($scope, $http, $rootScope, $stateParams, $state) {
  // var param = $stateParams;
  // $rootScope.paramCheck = Object.keys(param).length;
  $rootScope.currentState = $state.current.name;
  console.log('Profile ctrl');
  $http.get("/ownerProfile")
  .success(function(houses){
    $scope.houses = houses;
  });
//   $scope.houses = [
// {image: "http://www.loghouse.fi/wp-content/uploads/2011/11/log-house-5.jpg", squareFoot: 8788, bedrooms: 12, bathrooms: 14},
// {image: "http://www.loghouse.fi/wp-content/uploads/2011/11/log-house-5.jpg", squareFoot: 8788, bedrooms: 12, bathrooms: 14},
// {image: "http://www.loghouse.fi/wp-content/uploads/2011/11/log-house-5.jpg", squareFoot: 8788, bedrooms: 12, bathrooms: 14},
// {image: "http://www.loghouse.fi/wp-content/uploads/2011/11/log-house-5.jpg", squareFoot: 8788, bedrooms: 12, bathrooms: 14},
// {image: "http://www.loghouse.fi/wp-content/uploads/2011/11/log-house-5.jpg", squareFoot: 8788, bedrooms: 12, bathrooms: 14}
// ];


  $scope.removeListing = function(index, house){
  $scope.houses.splice(index, 1);
  // console.log(house);
  $http.delete("/ownerProfile/" + house._id);

  };
});
