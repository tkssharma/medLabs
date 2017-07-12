angular
.module('starter', [
  'ionic',
  'ui.router',
  'ngStorage',
  'localStorage.services',
  'firebase',
  'firebase.services',
  'data.services',
  'contact.controllers',
  'auth.controllers',
  'renaissance.controllers',
  'events.controllers',
  'eventsDetails.controllers',
  'localization.services',
  'pascalprecht.translate',
  'dcbImgFallback',
  'profile.controllers',
  'uiGmapgoogle-maps',
  'maps.controllers',
  'mapGeolocation.services'
  ])
.run(function ($ionicPlatform, $ionicPopup, FirebaseService, LocalStorageService, LocalizationService,$rootScope,$firebaseObject,$state,$ionicLoading) {

    // any time auth state changes, add the user data to scope
    FirebaseService.getServiceRef().$onAuthStateChanged(function(firebaseUser) {
      $rootScope.firebaseUser = firebaseUser;
    });
    $rootScope.isLoggedIn = function(){
      return FirebaseService.getAuth();
    }

    $rootScope.logout = function(){
      console.log("Logging out from the app");
      $ionicLoading.show({
        template: 'Logging Out...'
      });
      $state.go('app.login');
      FirebaseService.getServiceRef().$signOut();
      $ionicLoading.hide();
    }


    $ionicPlatform
    .ready(function () {
      if (! LocalStorageService.getData()) {
      //localization
      LocalizationService
      .getLanguage()
      .then(function (data) {
        LocalizationService.setLanguage(data);
      })
      .then(function () {
        //if not exist check internet connection
        if (true) {
          //fetch data
          if (true /*navigator.connection.type != Connection.NONE*/) {

            var ref = firebase.database().ref();
            var obj = $firebaseObject(ref);
              // to take an action after the data loads, use the $loaded() promise
              obj.$loaded().then(function() {
                console.log("loaded record:", obj.$id, obj.someOtherKeyInData);

               // To iterate the key/value pairs of the object, use angular.forEach()
              LocalStorageService.setEvents(obj['events']);
               //LocalStorageService.setRenaissance(data.$getRecord('renaissance'));
               LocalStorageService.setContacts(obj['contacts']);
              // LocalStorageService.setSponsors(data.$getRecord('sponsors'));
               LocalStorageService.setMapMarkers(obj['locations']);
               LocalStorageService.setData('true');
             });

            } else {
              $ionicPopup
              .alert({title: "Internet", content: "{{'content'| translate}}"})
              .then(function (res) {
                if (res)
                  navigator.app.exitApp();
              }
              );
            }
          }
        })
    }
  //update data
  if (! LocalStorageService.getData()) {
    LocalizationService
    .getLanguage()
    .then(function (data) {
      LocalizationService.setLanguage(data);
    })
    .then(function () {
      if (true) {
        if (true && FirebaseService.getAuth()) {
          var ref = firebase.database().ref();

          var obj = $firebaseObject(ref);

        // to take an action after the data loads, use the $loaded() promise
        obj.$loaded().then(function() {
          console.log("loaded record:", obj.$id, obj.someOtherKeyInData);

               // To iterate the key/value pairs of the object, use angular.forEach()

               LocalStorageService.setEvents(obj['events']);
               //LocalStorageService.setRenaissance(data.$getRecord('renaissance'));
               LocalStorageService.setContacts(obj['contacts']);
              // LocalStorageService.setSponsors(data.$getRecord('sponsors'));
               LocalStorageService.setMapMarkers(obj['locations']);
               LocalStorageService.setData('true');
             });
      }
    }
  })
  }

  if (window.cordova && window.cordova.plugins.Keyboard) {
    cordova
    .plugins
    .Keyboard
    .hideKeyboardAccessoryBar(true);
  }
  if (window.StatusBar) {
    StatusBar.styleDefault();
  }

});
  })
.config(function ($stateProvider, $urlRouterProvider, $translateProvider) {
  $stateProvider
  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "js/modules/menu/menu.html"
  })
  .state('app.home', {
    url: "/home",
    views: {
      'menuContent': {
        templateUrl: "js/modules/home/home.html"
      }
    }
  })
  .state('app.login', {
    url: "/login",
    views: {
      'menuContent': {
        templateUrl: "js/modules/login/login.html",
        controller: "authCtrl"
      }
    },
    resolve: {
        // controller will not be loaded until $requireSignIn resolves
        // Auth refers to our $firebaseAuth wrapper in the factory below
        "currentAuth": ["FirebaseService", function(FirebaseService) {
          // $requireSignIn returns a promise so the resolve waits for it to complete
          // If the promise is rejected, it will throw a $stateChangeError (see above)
          return  ! FirebaseService.getAuth()
        }]
      }
    })
    .state('app.loginauth', {
    url: "/loginauth",
    views: {
      'menuContent': {
        templateUrl: "js/modules/login/auth.html",
        controller: "authCtrl"
      }
    },
    resolve: {
        // controller will not be loaded until $requireSignIn resolves
        // Auth refers to our $firebaseAuth wrapper in the factory below
        "currentAuth": ["FirebaseService", function(FirebaseService) {
          // $requireSignIn returns a promise so the resolve waits for it to complete
          // If the promise is rejected, it will throw a $stateChangeError (see above)
          return  ! FirebaseService.getAuth()
        }]
      }
    })
  .state('app.register', {
    url: "/register",
    views: {
      'menuContent': {
        templateUrl: "js/modules/register/register.html",
        controller: "authCtrl"
      }
    },
    resolve: {
        // controller will not be loaded until $requireSignIn resolves
        // Auth refers to our $firebaseAuth wrapper in the factory below
        "currentAuth": ["FirebaseService", function(FirebaseService) {
          // $requireSignIn returns a promise so the resolve waits for it to complete
          // If the promise is rejected, it will throw a $stateChangeError (see above)
          return ! FirebaseService.getAuth()
        }]
      }
    })
  .state('app.renaissance', {
    url: "/renaissance",
    views: {
      'menuContent': {
        templateUrl: "js/modules/renaissance/renaissance.html",
        controller: "RenaissanceCtrl as rc"
      }
    }
  })
  .state('app.events', {
    url: "/events",
    abstract: true,
    views: {
      'menuContent': {
        templateUrl: "js/modules/events/events.html"
      }
    }
  })
  .state('app.events.day1', {
    url: "/day1/:day",
    views: {
      'tab-day1': {
        templateUrl: "js/modules/events/events-days.html",
        controller: "EventsCtrl as ec"
      }
    }
  })
  .state('app.events.day1Details', {
    url: "/day1/:description/:details/:time/:title/:img/:img2",
    views: {
      'tab-day1': {
        templateUrl: "js/modules/events/events-days-details.html",
        controller: "EventsDetailsCtrl as edc"
      }
    }
  })
  .state('app.events.day2', {
    url: "/day2/:day",
    views: {
      'tab-day2': {
        templateUrl: "js/modules/events/events-days.html",
        controller: "EventsCtrl as ec"
      }
    }
  })
  .state('app.events.day2Details', {
    url: "/day2/:description/:details/:time/:title/:img/:img2",
    views: {
      'tab-day2': {
        templateUrl: "js/modules/events/events-days-details.html",
        controller: "EventsDetailsCtrl as edc"
      }
    }
  })
  .state('app.events.day3', {
    url: "/day3/:day",
    views: {
      'tab-day3': {
        templateUrl: "js/modules/events/events-days.html",
        controller: "EventsCtrl as ec"
      }
    }
  })
  .state('app.events.day3Details', {
    url: "/day3/:description/:details/:time/:title/:img/:img2",
    views: {
      'tab-day3': {
        templateUrl: "js/modules/events/events-days-details.html",
        controller: "EventsDetailsCtrl as edc"
      }
    }
  })
  .state('app.map', {
    url: "/map",
    views: {
      'menuContent': {
        templateUrl: "js/modules/map/map.html",
        controller: 'MapCtrl as mc'
      }
    },
    resolve: {
        // controller will not be loaded until $requireSignIn resolves
        // Auth refers to our $firebaseAuth wrapper in the factory below
        "currentAuth": ["FirebaseService", function(FirebaseService) {
          // $requireSignIn returns a promise so the resolve waits for it to complete
          // If the promise is rejected, it will throw a $stateChangeError (see above)
          return FirebaseService.getServiceRef().$requireSignIn();
        }]
      }
    })
  .state('app.profile', {
    url: "/profile",
    views: {
      'menuContent': {
        templateUrl: "js/modules/profile/profile.html",
        controller: 'ProfileCtrl as sc'
      }
    },
    resolve: {
        // controller will not be loaded until $requireSignIn resolves
        // Auth refers to our $firebaseAuth wrapper in the factory below
        "currentAuth": ["FirebaseService", function(FirebaseService) {
          // $requireSignIn returns a promise so the resolve waits for it to complete
          // If the promise is rejected, it will throw a $stateChangeError (see above)
          return FirebaseService.getServiceRef().$requireSignIn();
        }]
      }
    })
  .state('app.contact', {
    url: "/contact",
    views: {
      'menuContent': {
        templateUrl: "js/modules/contact/contact.html",
        controller: 'ContactCtrl as cc'
      }
    }
  })
  .state('app.help', {
    url: "/help",
    views: {
      'menuContent': {
        templateUrl: "js/modules/help/help.html"
      }
    }
  })
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');

  //localization config
  $translateProvider.translations('en', {
    app_name: "Opiods Overdose Kit",
    l: "en",
    //menu
    menu_name: "Menu",
    menu_opiods_overdose: "Opiods-Overdose",
    menu_about_opiods_overdose: "About Opiods-Overdose",
    menu_about_ren_fest: "About renaissance",
    menu_event: "Events",
    menu_call911 : "Call 911",
    menu_map: "Find Overdose Kit",

    menu_profile : "Profile",
        menu_contact: "Contacts",
    menu_help: "Help",
    menu_login: "Login",
    menu_logout: "Logout",
    menu_register: "Register",
    menu_kit : "I Have Kit",

    //tabs
    day1: "Fri 28.8.",
    day2: "Sat 29.8.",
    day3: "Sun 30.8.",
    exit: "Exit",

    //internet connection popup alert
    title: "Enable internet",
    content: "For first usage please enable internet connection.",

    //event details
    timePlace: "Time and place",
    details: "Description"
  });

  $translateProvider.translations('hr', {
    app_name: "Opiods Overdose Kit",
    l: "hr",
    //menu
    menu_name: "Izbornik",
    menu_call911 : "Call 911",
    menu_name: "Menu",
    menu_opiods_overdose: "Opiods-Overdose",
    menu_about_opiods_overdose: "About Opiods-Overdose",
    menu_event: "Raspored programa",
    menu_map: "Find Overdose Kit",
    menu_kit : "I Have Kit",
    menu_profile : "Profile",
    menu_contact: "Kontakt",
    menu_help: "Pomoć",
    menu_login: "Login",
    menu_logout: "Logout",
    menu_register: "Register",
    //tabs
    day1: "Pet 28.8.",
    day2: "Sub 29.8.",
    day3: "Ned 30.8.",
    exit: "Izlaz",

    //internet connection popup alert
    title: "Uključite internet",
    content: "Prilikom prvog korištenja molimo vas da uključite internet.",

    //event details
    timePlace: "Vrijeme i mjesto:",
    details: "Opis"

  });
  $translateProvider.preferredLanguage("en");
  $translateProvider.fallbackLanguage("en");
})
