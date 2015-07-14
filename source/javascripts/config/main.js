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
