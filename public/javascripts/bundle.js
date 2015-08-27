'use strict()';

var app = angular.module('GriftrApp', ['ui.router']);

app.run(function(){
  console.log('Griftr Online');
});

'use strict()';

angular.module('GriftrApp')
.config(function($stateProvider, $urlRouterProvider){

  $urlRouterProvider.otherwise('/');

  $stateProvider
  .state('home', {url: '/', templateUrl: '/templates/home.html', controller: "HomeCtrl"})
  .state('newProperty', {url: '/newProperty', templateUrl: '/templates/newProperty.html', controller: "InfoCtrl"})
  .state('listing', {url: '/listing/:houseId', templateUrl: '/templates/listing.html', controller: "ListingCtrl"})
  .state('listings', {url: '/listings', templateUrl: '/templates/listings.html', controller: "ListingsCtrl"})
  .state('travellers', {url: '/travellers', templateUrl: '/templates/travellers.html', controller: "TravellersCtrl"})
  .state('info', {url: '', templateUrl: '/templates/info.html', abstract: true})
  .state('info.owner', {url: '/owner', templateUrl: '/templates/owner.html', controller: "InfoCtrl"})
  .state('info.traveller', {url: '/traveller', templateUrl: '/templates/traveller.html', controller: "InfoCtrl"})
  .state('ownerProfile', {url: '/ownerProfile', templateUrl: '/templates/ownerProfile.html', controller: "ProfileCtrl"});
})
.constant('urls',{
  'apiUrl': ''
});

angular.module('GriftrApp')
.factory("Listing", function($http){
  function Listing(){};
  Listing.test = function() {
    console.log('this is a test');
    // return 'this is a test';
  }
  Listing.getListing = function(houseId){
    console.log('house: ', houseId);
    return $http.get("/listing/" + houseId);
  }
  return Listing;
});
angular.module('GriftrApp')
.controller("HomeCtrl", function(){
  console.log("HOME CONTROLLLLLL!!!");

  $(document).ready(function(){
    $('.parallax').parallax();


    $('.light').textillate({ in: { effect: 'rollIn' } });

    var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

    function animateIntro (){
        $("#intro").addClass("animated bounceInRight").one(animationEnd, function(){
          //need to adjust times of these. too fast. kinda funky looking
          $(this).removeClass("animated bounceInRight").addClass("animated fadeOut").one(animationEnd, function(){
            // $(".banner").animate({ top: -126 }, function(){
              $(".find-button").fadeIn(1000);
              console.log("hey");
            // });
          });
        });
    }
      animateIntro();

    // function prompt(){
    //   setInterval(function(){
    //     $(".find").addClass("animated shake").one(animationEnd, function(){
    //       $(".find").removeClass("animated shake");
    //     });
    //   }, 8000);
    // }
    //   for (var i=0; i<100; i++){
    //     prompt();
    //   }

    function hide(){
      $("#intro").css("display", "none");
    }
  });
});

angular.module('GriftrApp')
.controller("InfoCtrl", function($scope, $rootScope, $state, $location, $http){
console.log("get dat info");




$('.collapsible').collapsible({
  accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
});

  if($rootScope.currentUser){
    currentUser = $rootScope.currentUser;
  } else{
    currentUser = null; // Add more to catch null?
  }

  $scope.hideForm = currentUser.owner ? true : false;

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

'use strict()';

angular.module('GriftrApp')
.controller('ListingCtrl', function($scope, $http, $rootScope, $location, Listing, $stateParams) {

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
'use strict()';

angular.module('GriftrApp')
.controller('ListingsCtrl', function($scope, $http, $rootScope, $location, Listing, $stateParams) {
  console.log('Listings ctrl');
  $http.get("/listings").success(function(houses){
    // console.log(listings);
    $scope.houses = houses;
  });
});
'use strict()';

angular.module('GriftrApp')
.controller('ProfileCtrl', function($scope, $http, $rootScope) {
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

'use strict()';

angular.module('GriftrApp')
.controller('PropCtrl', function($scope, $http, $rootScope) {
  console.log('Prop ctrl');
  $scope.test = 'Test!';
});

'use strict()';

angular.module('GriftrApp')
.controller('TravellersCtrl', function($scope, $http, $rootScope) {
  $http.get("/travellers").success(function(travellers){
    // console.log(listings);
    $scope.travellers = travellers;
  });  
});

'use strict()';

angular.module('GriftrApp')
.controller('NavCtrl', function($scope, $http, $rootScope, $state) {
  console.log('nav ctrl');
  $http.get("/getUserData").success(function(userData){
    console.log(userData);
    $rootScope.currentUser = userData;
  });
  $scope.goToProfile = function() {
    if ($rootScope.currentUser.owner) {
      console.log('owner');
      $state.go('info.owner');
    } else {
      console.log('traveller');
      $state.go('info.traveller');
    }

    console.log($rootScope.currentUser);
  };
});
