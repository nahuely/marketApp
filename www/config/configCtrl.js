(function() {
    'use strict';

    function configCtrl($scope, config) {
        var vm = this;
        var configData = config.getConfig();

        vm.priceLimit = configData.config.priceLimit;
        vm.itemsLimit = configData.config.itemsLimit;

        $scope.$watch("Config.priceLimit", function(newVal) {
        	configData.config.priceLimit = newVal;
        })

        $scope.$watch("Config.itemsLimit", function(newVal) {
        	configData.config.itemsLimit = newVal;
        })

    }

    angular.module('mercadoApp.config.controller', [])
        .controller('configCtrl', ['$scope', 'config', configCtrl])
})();
