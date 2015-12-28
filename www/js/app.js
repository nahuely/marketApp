// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('mercadoApp', ['ionic',
        'ngStorage',
        'mercadoApp.routes',
        'mercadoApp.home.module',
        'mercadoApp.scan.module',
        'mercadoApp.config.module',
        'mercadoApp.services',
        'mercadoApp.detail.module',
        'mercadoApp.favorites.module',
        'mercadoApp.explanation.module',
        'ngCordova',
        'ionic-native-transitions'
    ])
    .config(['$ionicConfigProvider', '$localStorageProvider', function($ionicConfigProvider, $localStorageProvider) {
        $ionicConfigProvider.backButton.text('');
        $ionicConfigProvider.backButton.previousTitleText('');
        $ionicConfigProvider.backButton.icon('ion-ios-arrow-back');
        $ionicConfigProvider.tabs.position('bottom');
        $ionicConfigProvider.scrolling.jsScrolling(false);

        if ($localStorageProvider.get('config') === null) {
            $localStorageProvider.set('config', {
                "config": {
                    "priceLimit": 10000,
                    "itemsLimit": 20
                }
            })
        }
    }])
    .run(function($ionicPlatform, $localStorage, $rootScope, $location) {
        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }

            var io = Ionic.io();
            var push = new Ionic.Push({
              "onNotification": function(notification) {
                  console.log(notification)
              },
              "pluginConfig": {
                "android": {
                  "iconColor": "#0000FF"
                }
              }
            });
            var user = Ionic.User.current();

            if (!user.id) {
              user.id = Ionic.User.anonymousId();
            }

            // Just add some dummy data..
            user.set('name', 'nahuel');
            user.save();

            var callback = function(data) {
              console.log(data)
              push.addTokenToUser(user);
              user.save();
            };
            push.register(callback);
        });

        if ($localStorage.favorites === undefined) {
            $localStorage.favorites = [];
        }

        if ($localStorage.explanationDone === undefined) {
            $localStorage.explanationDone = false;
        }

        $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
            var flag = $localStorage.explanationDone;
            if(!flag) {
                $location.path('explanation');
            } else if(flag && toState.name === 'explanation') {
                $location.path('layout.list');
            }
        });
    })
