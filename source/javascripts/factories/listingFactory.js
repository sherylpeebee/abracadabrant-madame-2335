angular.module('GriftrApp')
.factory("Listing", function($http){
  function Listing(){}
  Listing.test = function() {
    console.log('this is a test');
    // return 'this is a test';
  };
  Listing.getListing = function(houseId){
    console.log('house: ', houseId);
    return $http.get("/listing/" + houseId);
  };

  Listing.requestHousings = function(houseId){
    console.log('house: ', houseId);
    return $http.get("/listing/" + houseId);
  };
  return Listing;
});
