'use strict()';

angular.module('GriftrApp')
.controller('ListingCtrl', function($scope, $http, $rootScope, $location, Listing, $stateParams) {
    $scope.test = "DOOKIEIEIEIE!!!";
    $(document).ready(function(){
      console.log("let's go");
      // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
      $('.modal-trigger').leanModal();
    });
  var param = $stateParams;
  $rootScope.paramCheck = Object.keys(param).length;
    // console.log(house);
    $scope.params = $stateParams;
    Listing.getListing($stateParams.houseId)
    .then(function(data){
      console.log(data.data);
      console.log("I'm ALIIIIVVVVEEEEUHH!!!");
      $scope.houseInfo = data.data;
    })
    .catch(function(error){
      console.log(error);
    });
});
