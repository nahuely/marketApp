(function() {
    'use strict';

    function routerConfig($stateProvider, $urlRouterProvider) {
        //declaracion de estados de la aplicacion
        $stateProvider
            .state('explanation', {//nombre del estado
                url: '/explanation', //url del estado
                templateUrl: 'explanation/explanation.html', //donde esta el template (html)
                controller: 'explanationCtrl as Explanation' // quien va a ser el controller de este estado
            })
            .state('layout', {
                url: '/home',
                templateUrl: 'layout/main.layout.html',
                abstract: true //estado abstracto que no se va a poder instanciar
            })
            .state('layout.list', {
                url: '/list',
                params: {
                	scanQuery: null,
                },
                views: {
                    'tab-home': {
                        templateUrl: 'home/home.html',
                        controller: 'homeCtrl as Home'
                    }
                }
            })
            .state('layout.detail', {
                url: '/product/:id',
                views: {
                    'tab-home': {
                        templateUrl: 'detail/detail.html',
                        controller: 'detailCtrl as Detail'
                    }
                }
            })
            .state('layout.scan', {
                url: '/scan',
                views: {
                    'tab-scan': {
                        templateUrl: 'scan/scan.html',
                        controller: 'scanCtrl as Scan'
                    }
                }
            })
            .state('layout.favorites', {
                url: '/favorites',
                views: {
                    'tab-favorites': {
                        templateUrl: 'favorites/favorites.html',
                        controller: 'favoritesCtrl as Favorites'
                    }
                }
            })
            .state('layout.config', {
                url: '/config',
                views: {
                    'tab-config': {
                        templateUrl: 'config/config.html',
                        controller: 'configCtrl as Config'
                    }
                }
            })

        $urlRouterProvider.otherwise('/home/list') //ruta por defecto
    }

    angular.module('mercadoApp.routes', [])
        .config(['$stateProvider', '$urlRouterProvider', routerConfig])
})();
