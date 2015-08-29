angular.module('GriftrApp')
.controller("InfoCtrl", function($scope, $rootScope, $state, $location, $http, $stateParams){
console.log("get dat info");
// var param = $stateParams;
// console.log(param);
// $rootScope.paramCheck = Object.keys(param).length;
// console.log($rootScope.paramCheck);
var currentUser;

$rootScope.currentState = $state.current.name;

$('.collapsible').collapsible({
  accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
});

$(document).ready(function(){
  $("#buildProfileBtn").click(loginPompt);
});

function loginPompt(){
  if(!currentUser){
    alertify.alert('Seriously! You gotta <a href="/auth/twitter">log in</a>.').set('onok', function(closeEvent){ alertify.success("You're a good person.");} );
    console.log("no dice");
  }
}


  if($rootScope.currentUser){
    currentUser = $rootScope.currentUser;
  } else{
    // currentUser = null; // Add more to catch null?
    alertify.alert('Please <a href="/auth/twitter">Login</a> to Continue').set('onok', function(closeEvent){ alertify.success("You're the best!");} );
    // alertify.success('successfully logged in')
  }

  $scope.hideForm = currentUser.owner ? false : true;

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
