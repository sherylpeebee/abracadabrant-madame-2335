angular.module('GriftrApp')
.controller("HomeCtrl", function($stateParams, $rootScope){
  console.log("HOME CONTROLLLLLL!!!");
  var param = $stateParams;
  $rootScope.paramCheck = Object.keys(param).length;

  $(document).ready(function(){
    $('.parallax').parallax();


    $('.light').textillate({ in: { effect: 'rollIn' } });

    var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

    function animateIntro (){
        $("#intro").addClass("animated bounceInRight").one(animationEnd, function(){
          //need to adjust times of these. too fast. kinda funky looking
          $(this).removeClass("animated bounceInRight").addClass("animated fadeOut").one(animationEnd, function(){
              $(".find-button").fadeIn(1000);
              console.log("hey");
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
