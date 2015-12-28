(function() {
	'use strict';

	function homeCtrl(mercadolibreApi, $state, $ionicLoading, $stateParams, $cordovaToast) {
		var vm = this;

		vm.search = function(query) {
			vm.productos = [];
			$ionicLoading.show();
			mercadolibreApi.getProducts(query)
				.then(function(prod) {
					vm.productos = prod.data.results;
					$cordovaToast.show('Se encontraron ' + vm.productos.length + ' resultados', 'short', 'bottom');
				})
				.catch(function(err) {
					$cordovaToast.show(err.message, 'short', 'bottom');
				})
				.finally(function() {
					$ionicLoading.hide();
				})
		}

		if($stateParams.scanQuery !== null) {
			vm.search($stateParams.scanQuery);
			vm.query = $stateParams.scanQuery;
		}

	}

	angular.module('mercadoApp.home.controller', [])
		.controller('homeCtrl', ['mercadolibreApi', '$state', '$ionicLoading', '$stateParams', '$cordovaToast', homeCtrl])
})();
