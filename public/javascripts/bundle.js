'use strict';

var app = angular.module('GriftrApp', ['ui.router']);

app.run(function(){
  console.log('Griftr Online');
});

'use strict';

angular.module('GriftrApp')
.config(function($stateProvider, $urlRouterProvider){

  $urlRouterProvider.otherwise('/');

  $stateProvider
  .state('home', {url: '/', templateUrl: '/templates/home.html'});
});

'use strict';

angular.module('GriftrApp')
.constant('urls',{
  'apiUrl': ''
});
