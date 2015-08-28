'use strict()';

angular.module('GriftrApp')
.controller('PropCtrl', function($scope, $http, $rootScope, $stateParams, $state) {
  // var param = $stateParams;
  // $rootScope.paramCheck = Object.keys(param).length;
  $rootScope.currentState = $state.current.name;
  console.log('Prop ctrl');
  $scope.test = 'Test!';
});
