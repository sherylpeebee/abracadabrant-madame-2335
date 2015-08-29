'use strict()';

angular.module('GriftrApp')
.controller('ListingCtrl', function($scope, $http, $rootScope, $location, Listing, $stateParams, $state) {
    $(document).ready(function(){
      console.log("let's go");
      // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
      $('.modal-trigger').leanModal();
      $("#request_btn").click(loginPompt);
      // $("#reservation_request").click(loginPompt);
    });

    function loginPompt(){
      if(!$rootScope.currentUser){
        alertify.alert('Please <a href="/auth/twitter">Login</a> to Continue').set('onok', function(closeEvent){ alertify.success("You're the best!");} );
      }
    }
  // var param = $stateParams;
  // $rootScope.paramCheck = Object.keys(param).length;
  $rootScope.currentState = $state.current.name;

    Listing.getListing($stateParams.houseId)
    .then(function(data){
      console.log(data.data);
      $scope.houseInfo = data.data;
    })
    .catch(function(error){
      console.log(error);
    });

  $scope.makeHousingRequest = function(request){
    console.log(request);
  };
});
