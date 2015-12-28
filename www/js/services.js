(function() {
    'use strict';

    function mercadolibreApiFactory(api, queryFactory) {
        var methods = {};

        methods.getProducts = function(string) {
            var url = api.mercadolibreSearch.replace('{{query}}', string);
            return queryFactory.query(url);
        }

        methods.queryById = function(id) {
            var url = api.mercadolibreId.replace('{{query}}', id);
            return queryFactory.query(url);
        }

        return methods;
    }

    function config($localStorage) {
        var methods = {};

        methods.getConfig = function() {
            return $localStorage.config;
        }

        methods.setPriceLimit = function(limit) {
            return $localStorage.config.priceLimit = limit;
        }

        methods.setItemsLimit = function(limit) {
            return $localStorage.config.itemsLimit = limit;
        }

        return methods;
    }

    function favorites($localStorage) {
        var methods = {};

        methods.getFavorites = function() {
            return $localStorage.favorites;
        }

        methods.addItem = function(item) {
            if(this.itemExists(item.id)) {
                return false;
            } else {
                $localStorage.favorites.push(item);
                return true;
            }
        }

        methods.deleteItem = function(index) {
            $localStorage.favorites.splice(index, 1);
        }

        methods.itemExists = function(id) {
            var itemId = "";
            for(var x = 0; x < $localStorage.favorites.length; x++) {
                itemId = $localStorage.favorites[x].id;
                if(id === itemId) {
                    return true;
                }
            }
            return false;
        }

        return methods;
    }

    function upcFactory(api, queryFactory) {
        var methods = {};

        methods.getProducts = function(string) {
            var url = api.upc.replace('{{query}}', string);
            return queryFactory.query(url);
        }

        return methods;
    }

    function queryFactory($q, $http) {
        var methods = {};

        methods.query = function(apiUrl) {
            var defered = $q.defer();
            $http.get(apiUrl)
                .then(function(data) {
                    defered.resolve(data);
                }, function(err) {
                    defered.reject(err);
                })

            return defered.promise;
        }
        return methods;
    }

    function configInterceptor(config) {
        var configData = config.getConfig();
        var configInjector = {
            request: function(configRequest) {
                configRequest.url = configRequest.url.replace('{{items}}', configData.config.itemsLimit);
                configRequest.url = configRequest.url.replace('{{price}}', configData.config.priceLimit);

                return configRequest;
            }
        };

        return configInjector;
    }

    function barCodeFactory($q, $cordovaBarcodeScanner) {
        var methods = {};

        methods.getBarCode = function() {
            var defered = $q.defer();
            $cordovaBarcodeScanner
                .scan()
                .then(function(barcodeData) {
                    defered.resolve(barcodeData);
                }, function(err) {
                    defered.reject(err);
                });
            return defered.promise;
        }

        return methods;
    }

    angular.module('mercadoApp.services', [])
        .config(['$httpProvider', function($httpProvider) {
            $httpProvider.interceptors.push(configInterceptor);
        }])
        .factory('mercadolibreApi', ['api', 'queryFactory', mercadolibreApiFactory])
        .factory('favorites', ['$localStorage', favorites])
        .factory('upcApi', ['api', 'queryFactory', upcFactory])
        .factory('queryFactory', ['$q', '$http', queryFactory])
        .factory('barCodeFactory', ['$q', '$cordovaBarcodeScanner', barCodeFactory])
        .factory('config', ['$localStorage', config])
        .factory('configInterceptor', ['config', configInterceptor])
        .constant('api', {
            upc: 'http://eandata.com/feed/?v=3&keycode=3C56CB1756286D10&mode=json&find={{query}}&get=product,brand',
            mercadolibreSearch: 'https://api.mercadolibre.com/sites/MLA/search?q={{query}}&limit={{items}}&price=*-{{price}}',
            mercadolibreId: 'https://api.mercadolibre.com/items/{{query}}'
        })
})();
