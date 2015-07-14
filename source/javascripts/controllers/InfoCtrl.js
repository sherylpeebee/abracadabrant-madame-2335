angular.module('GriftrApp')
.controller("InfoCtrl", function($scope, $rootScope, $state, $location, $http){
console.log("get dat info");

  if($rootScope.currentUser){
    currentUser = $rootScope.currentUser;
  } else{
    currentUser = null; // Add more to catch null?
  }

  $scope.submitInfo = function(user){
    if($state.current.name === "info.owner"){
      currentUser.userType = 'owner';
      currentUser.owner.firstName = user.firstName;
      currentUser.owner.lastName = user.lastName;
      currentUser.owner.email = user.email;
      console.log(currentUser);

      $http.post("/userinfo", currentUser).success(function(data, status){
        console.log(data);
        $scope.user = {};
        $state.go('ownerProfile');
      }).catch(function(err){
        console.log(err);
      });
    }
    else if($state.current.name === "info.traveller"){
      currentUser.userType = 'traveller';
      currentUser.traveller = user;
      console.log(currentUser);
      $http.post("/userinfo", currentUser).success(function(data, status){
        console.log(data);
        $scope.traveller = {};
        $state.go('listings');
      }).catch(function(err){
        console.log(err);
      });
    }
  };

  $scope.submitProperty = function(house){
    house.user = $rootScope.currentUser.twitter.id;
    // house.user = currentUser;
    // console.log(house);
    $http.post("/house", house).success(function(data, status){
      console.log(data);
      $state.go('ownerProfile');
    }).catch(function(err){
      console.log(err);
    });
  };
});
