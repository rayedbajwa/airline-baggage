// angular.module is a global place for creating, registering and retrieving Angular modules
// 'directory' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'directory.services' is found in services.js
// 'directory.controllers' is found in controllers.js
angular.module('airline', ['ionic', 'airline.controllers','ngLodash'])

.run(function($ionicPlatform,$rootScope) {
$rootScope._ = window._;
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.constant('_', window._)
.config(function($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

      .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/menu.html'
    })

    .state('app.party', {
      url: '/party',
      views: {
        'mainContent': {
          templateUrl: 'templates/party.html',
          controller: 'PartyCtrl'
        }
      }
    })


    .state('app.party_edit', {
      url: '/editParty/:partyID',

      views: {
        'mainContent': {
          templateUrl: 'templates/party_edit.html',
          controller: 'PartyEditCtrl'
        }
      }

    })

    .state('app.members', {
      url: '/members/:partyID',
      views: {
        'mainContent': {
          templateUrl: 'templates/members.html',
          controller: 'savememberCtrl'
        }
      }

    })
    
//    .state('app.home', {
//      url: '/home',
//      views: {
//        'mainContent': {
//          templateUrl: 'templates/home.html',
//          controller: 'homeCtrl'
//        }
//      }
//
//    })

    .state('app.members_edit', {
      url: '/editMembers/:partyID',
      views: {
        'mainContent': {
          templateUrl: 'templates/members_edit.html',
          controller: 'MembersEditCtrl'
        }
      }

    })


    .state('app.bags', {
      url: '/bags/:partyID',
      views: {
        'mainContent': {
          templateUrl: 'templates/bags.html',
          controller: 'saveluggageCtrl'
        }
      }

    })

    .state('app.bags_edit', {
      url: '/editLuggage/:partyID',
      views: {
        'mainContent': {
          templateUrl: 'templates/bags_edit.html',
          controller: 'editLuggageCtrl'
        }
      }

    })

    .state('app.payment', {
      url: '/payment/:partyID',
      views: {
        'mainContent': {
          templateUrl: 'templates/payment.html',
          controller: 'paymentCtrl'
        }
      }

    })

    .state('app.print', {
      url: '/print/:partyID',
      views: {
        'mainContent': {
          templateUrl: 'templates/print.html',
          controller: 'printCtrl'
        }
      }

    })

    .state('app.summary', {
      url: '/summary/:partyID',
      views: {
        'mainContent': {
          templateUrl: 'templates/summary.html',
          controller: 'summaryCtrl'
        }
      }

    })

    .state('app.forms', {
      url: '/forms',
      views: {
        'mainContent': {
          templateUrl: 'templates/saved_forms.html',
          controller: 'savedformsCtrl'
        }
      }

    })


    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/party');

  })
  //7qZsBH7UH4Y9c72V
